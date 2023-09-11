import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { getPhoto } from '@api/endingData';
import IconCamera from '@assets/icons/IconCamera';
import Loading from '@components/loading/Loading';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselLeftArrow from './CarouselLeftArrow';
import CarouselModal from './CarouselModal';
import CarouselRightArrow from './CarouselRightArrow';

const Carousel = () => {
  const [photoData, setPhotoData] = useState<string[]>([]);
  const [imageModal, setImageModal] = useState({
    url: '',
    isOpen: false,
  });

  const { id: planId } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['ending_photo', planId],
    queryFn: async () => await getPhoto(planId as string),
  });

  const onClickImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    url: string,
  ) => {
    const target = e.currentTarget;
    const wrapperClassName = target.parentNode?.parentElement
      ?.getAttribute('class')
      ?.split(' ');
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (wrapperClassName?.includes('slick-center')) {
      setImageModal({ url, isOpen: true });
    }
  };
  const onClickCloseModal = () => {
    setImageModal({ url: '', isOpen: false });
  };

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
    <section className="md:w-[720px] sm:w-[286px]">
      <div className="flex items-center mt-[30px]">
        <IconCamera w="w-[21px]" h="h-[18px]" fill="#4E4F54" />
        <div className="ml-[8px] text-lg font-bold text-gray_dark_1">
          사진첩
        </div>
      </div>
      <div className="p-[10px] md:w-[720px] sm:w-[286px]">
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
          nextArrow={<CarouselRightArrow />}
          prevArrow={<CarouselLeftArrow />}
          slidesToShow={3}
          slidesToScroll={1}
          speed={500}
        >
          {photoData.map((url: string, index: number) => (
            <div
              key={uuid()}
              onClick={(e) => {
                onClickImage(e, url);
              }}
              className=" cursor-pointer brightness-[0.95] hover:brightness-100 transition-filter duration-400
                md:w-[230px] md:h-[230px] md:p-[10px]
                sm:w-[90px] sm:h-[90px] sm:p-[5px]
              "
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
      {imageModal.isOpen && (
        <CarouselModal url={imageModal.url} closeFunc={onClickCloseModal} />
      )}
    </section>
  ) : null;
};

export default Carousel;
