import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPhoto } from '@api/endingData';
import IconCamera from '@assets/icons/IconCamera';
import { Perspective } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';

const Carousel = () => {
  const [photoData, setPhotoData] = useState<string[]>([]);
  const _plugins = [new Perspective({ rotate: 0.5 })];
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
    return <div>로딩중</div>;
  }

  return photoData.length > 1 ? (
    <section>
      <label className="flex items-center">
        <span className="mr-3">
          <IconCamera />
        </span>
        <p className="text-lg">사진첩</p>
      </label>
      <div className='w-[720px] p-5 overflow-hidden'>
        <Flicking
          circular={true}
          plugins={_plugins}
          panelsPerView={3}
          align="center"
        >
          {photoData.map((url: string, index: number) => (
            <div
              key={uuid()}
              className="relative cursor-pointer  brightness-75 hover:brightness-100 transition-filter duration-400"
            >
              <img
                src={url}
                alt={`photo${index}`}
                className="w-full h-full object-cover rounded-3xl "
              />
            </div>
          ))}
        </Flicking>
      </div>
    </section>
  ) : null;
};

export default Carousel;
