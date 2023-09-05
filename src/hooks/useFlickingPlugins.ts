import { useEffect, useRef, useState } from 'react';

import { Perspective } from '@egjs/flicking-plugins';
import { sideBarStore } from '@store/sideBarStore';

import type Flicking from '@egjs/flicking';

const useFlickingPlugins = () => {
  const [_plugins] = useState([new Perspective({ rotate: 0.5 })]);
  const flickingRef = useRef<Flicking>(null);
  // const [panelIndex, setPanelIndex] = useState(0);

  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);

  useEffect(() => {
    // 방법 1 사이드 바를 열고 닫을 때 슬라이드가 처음부터 시작
    // const handelPositionForRerender = async () => {
    //   if (flickingRef.current !== null) {
    //     const currentIndex = flickingRef.current.index;

    //     setPanelIndex(currentIndex);
    //     await flickingRef.current.moveTo(currentIndex + 1, 0);
    //     await flickingRef.current.moveTo(currentIndex, 0);
    //   }
    // };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-floating-promises
    // handelPositionForRerender();

    // 방법 2

    // 사이드 바를 열고 닫을 때 캐러셀이 target 스타일을 제대로 받지 못해서 나는 오류를
    // 해결하기 위해 ref를 설정해 주었지만 스타일이 깨지는 오류가 발생함
    // 이를 해결하기 위해 사이드바가 열고 닫혔을 때 직접 슬라이드를 움직여 줘야함
    // 아쉽게도 슬라이드를 돌리는 와중 실시간으로 index값을 받지 못하여
    // 슬라이드를 초기화 시키게 됨...

    const handelPositionForRerender = async () => {
      if (flickingRef.current !== null) {
        await flickingRef.current.next(0);
        await flickingRef.current.prev(0);
        console.log(flickingRef.current.index);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-floating-promises
    handelPositionForRerender();
  }, [isSideBarOpen]);

  return { _plugins, flickingRef };
};

export default useFlickingPlugins;
