/* eslint-disable @typescript-eslint/no-invalid-void-type */
import React, { useRef } from 'react';
import { type XYCoord, useDrag, useDrop } from 'react-dnd';

import { type PinContentsType } from '@api/pins';
import IconSixDots from '@assets/icons/IconSixDots';
import { type Identifier } from 'dnd-core';
// import _ from 'lodash';

import DropDown from './DropDown';

interface PinProps {
  id: string;
  pin: PinContentsType;
  idx: number;
  betweenDistanceData: string;
  pinArrLength: number;
  handleUpdate: (idx: number) => void;
  handleDelete: (idx: number) => void;
  movePins: (beforeIdx: number, afterIdx: number) => void;
}

interface ItemType {
  id: string;
  idx: number;
}

const Pin = (props: PinProps) => {
  const {
    id,
    pin,
    idx,
    betweenDistanceData,
    pinArrLength,
    handleUpdate,
    handleDelete,
    movePins,
  } = props;

  const dragBoxRef = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<
    ItemType,
    void,
    { handlerId: Identifier | null }
  >(() => ({
    accept: 'pin',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, moniter) => {
      if (dragBoxRef.current === null) return;

      const dragIndex = item.idx;
      const hoverIndex = idx;

      // 호버가 되고 위치가 바뀌면 여기 if문에서 막히게 해서 movePins가 실행이 되지 않게 해야함

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = dragBoxRef.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = moniter.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      movePins(item.idx, hoverIndex);
      // throttleHoverItem(item, hoverIndex, movePins);

      // 키값 중복 x, 보완하기 => movePin 함수로 들어가고 setState함수가 실행이 됐을 때 ~ 리렌더링 할 때 이
      // 사이 공백 시간에 인덱스를 같게 만들어 줌으로써 위의 if문에 막히고 movePins함수가 실행되지 않도록 해주는 역할임
      // 하지만 여기서는 적용이 안됨.. 오류를 유발함. => 리렌더링이 되고 난 이후에 item.idx는 바뀐 인덱스 값이고 hoverIndex값은
      // 바뀌고 난 이후 아이템의 인덱스기 때문에 다시 원래 인덱스로 돌아가게 된다.
      // item.idx = hoverIndex; 미리 바꿔줌
    },
  }));

  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: 'pin',
    item: { id, idx },
    collect: (moniter) => ({
      isDragging: !!moniter.isDragging(),
    }),
    end: (item, moniter) => {
      const { idx: afterIndex } = item;
      // const didDrop = moniter.didDrop();
      console.log('drop', afterIndex, idx);
      // if (!didDrop) {
      //   movePlns(idx, afterIndex);
      // }
    },
  }));

  drop(previewRef(dragBoxRef));
  return (
    <li
      ref={dragBoxRef}
      data-handler-id={handlerId}
      className={`flex gap-[10px] h-[100px] transition-all ${
        isDragging ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-[65px]">
        <p>{idx + 1}</p>
        {idx < pinArrLength - 1 && (
          <div>
            <p>{betweenDistanceData}</p>
          </div>
        )}
      </div>
      <div className="flex w-full border">
        <button ref={dragRef} className="flex-center w-[50px] m-3">
          <IconSixDots fill="orange" />
        </button>
        <div className="flex flex-col justify-center gap-2 w-full">
          <p>
            {pin !== null && typeof pin === 'object' && 'placeName' in pin && (
              <span>{pin.placeName as string}</span>
            )}
          </p>
          <p>
            {pin !== null && typeof pin === 'object' && 'cost' in pin && (
              <span>￦{pin.cost}</span>
            )}
          </p>
        </div>
        <div className="flex items-center ">
          <DropDown>
            <ul className="absolute left-0 bottom-[-60px] rounded-md bg-white">
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  handleUpdate(idx);
                }}
                className="flex-center w-[80px] h-[40px] border rounded-t-md cursor-pointer"
              >
                수정
              </li>
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  handleDelete(idx);
                }}
                className="flex-center w-[80px] h-[40px] border rounded-b-md cursor-pointer"
              >
                삭제
              </li>
            </ul>
          </DropDown>
        </div>
      </div>
    </li>
  );
};

export default Pin;
