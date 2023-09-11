import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { getPhoto } from '@api/endingData';
import IconCamera from '@assets/icons/IconCamera';
import Loading from '@components/loading/Loading';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const [photoData, setPhotoData] = useState<string[]>([]);
  const { id: planId } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['ending_photo', planId],
    queryFn: async () => await getPhoto(planId as string),
  });

  useEffect(() => {
    if (data !== null && data !== undefined) {
      const photos = data[0].pictures;

      let extendedPhotos = [...photos];
      if (photos.length !== 0 && photos.length < 4) {
        while (extendedPhotos.length < 5) {
          extendedPhotos = [...extendedPhotos, ...photos];
        }
      }
      setPhotoData(extendedPhotos);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return photoData.length > 3 ? (
    <section className="w-[720px]">
      <div className="flex items-center mt-[30px]">
        <IconCamera w="w-[21px]" h="h-[18px]" fill="#4E4F54" />
        <div className="ml-[8px] text-lg font-bold text-gray_dark_1">
          사진첩
        </div>
      </div>
      <div className="w-[720px] p-[10px] ">
        <Slider
          focusOnSelect
          infinite
          draggable
          swipeToSlide
          useCSS
          centerPadding={'0px'}
          centerMode
          initialSlide={0}
          touchMove
          slidesToShow={3}
          slidesToScroll={1}
          speed={500}
        >
          {photoData.map((url: string, index: number) => (
            <div
              key={uuid()}
              className=" w-[230px] h-[230px] p-[10px] cursor-pointer brightness-[0.8] hover:brightness-100 transition-filter duration-400"
            >
              <img
                src={url}
                alt={`photo${index}`}
                className="object-cover w-full h-full rounded-3xl "
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  ) : null;
};

export default Carousel;
