import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPhoto } from '@api/endingData';
import IconCamera from '@assets/icons/IconCamera';
import { Perspective } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { useQuery } from '@tanstack/react-query';

const Carousel = () => {
  const [photoData, setPhotoData] = useState<string[]>([]);
  const _plugins = [new Perspective({ rotate: 0.5 })];
  const { id: planId } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['ending_photo', planId],
    queryFn: async () => await getPhoto(planId as string),
  });

  console.log('DATA', data);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const photos: string[] = data[0]?.pictures || [];
      let extendedPhotos: string[] = [...photos];
      if (photos.length < 4) {
        while (extendedPhotos.length < 12) {
          extendedPhotos = [...extendedPhotos, ...photos];
        }
      }
      setPhotoData(extendedPhotos);
    }
  }, [data]);

  if (isLoading) {
    console.log('로딩중...');
  }
  return (
    <section className="p-5 md:p-10 pb-20 overflow-hidden w-2/3">
      {photoData.length > 1 ? (
        <>
          <label>
            <IconCamera /> 사진첩
          </label>
          <Flicking
            circular={true}
            plugins={_plugins}
            panelsPerView={3}
            align="center"
          >
            {photoData.map((url: string, index: number) => (
              <div
                key={index}
                className="relative cursor-pointer  brightness-75 hover:brightness-100 transition duration-400"
              >
                <img
                  src={url}
                  alt={`photo${index}`}
                  className="w-full mx-20 h-full object-cover rounded-3xl "
                />
              </div>
            ))}
          </Flicking>
        </>
      ) : null}
    </section>
  );
};

export default Carousel;
