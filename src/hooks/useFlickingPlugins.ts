import { useEffect, useRef, useState } from 'react';

import { Perspective } from '@egjs/flicking-plugins';
import { sideBarStore } from '@store/sideBarStore';

import type Flicking from '@egjs/flicking';

const useFlickingPlugins = () => {
  const [_plugins] = useState([new Perspective({ rotate: 0.5 })]);
  const flickingRef = useRef<Flicking>(null);

  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);

  useEffect(() => {
    const handelPositionForRerender = async () => {
      if (flickingRef.current !== null) {
        await flickingRef.current.next(0);
        await flickingRef.current.prev(0);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-floating-promises
    handelPositionForRerender();
  }, [isSideBarOpen]);

  return { _plugins, flickingRef };
};

export default useFlickingPlugins;
