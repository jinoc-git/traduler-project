import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPhoto } from '@api/endingData';
import IconCamera from '@assets/icons/IconCamera';
import Loading from '@components/loading/Loading';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import useFlickingPlugins from '@hooks/useFlickingPlugins';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';

const Carousel = () => {
  const [photoData, setPhotoData] = useState<string[]>([]);
  const { id: planId } = useParams<{ id: string }>();
  const { _plugins, flickingRef } = useFlickingPlugins();

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
      <div className="flex items-center my-[30px]">
        <IconCamera fill="#4E4F54" />
        <div className="ml-[8px] text-lg font-bold text-gray_dark_1">
          사진첩
        </div>
      </div>
      <div className="w-[720px] p-5 overflow-hidden">
        <Flicking
          circular={true}
          plugins={_plugins}
          panelsPerView={3}
          ref={flickingRef as React.LegacyRef<Flicking>}
          align="center"
        >
          {photoData.map((url: string, index: number) => (
            <div
              key={uuid()}
              className="relative cursor-pointer brightness-75 hover:brightness-100 transition-filter duration-400"
            >
              <img
                src={url}
                alt={`photo${index}`}
                className="object-cover w-full h-full rounded-3xl "
              />
            </div>
          ))}
        </Flicking>
      </div>
    </section>
  ) : null;
};

export default Carousel;