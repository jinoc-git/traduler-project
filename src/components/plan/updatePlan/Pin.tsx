import React, { useRef } from 'react';
import { type XYCoord, useDrag, useDrop } from 'react-dnd';

import { type PinContentsType } from '@api/pins';
import IconSixDots from '@assets/icons/IconSixDots';
import _ from 'lodash';

import DropDown from './DropDown';

interface PinProps {
  id: string;
  pin: PinContentsType;
  idx: number;
  betweenDistanceData: string;
  pinArrLength: number;
  handleUpdate: (idx: number) => void;
  handleDelete: (idx: number) => void;
  movePlns: (beforeIdx: number, afterIdx: number) => void;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    movePlns,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dragBoxRef = useRef<HTMLLIElement>(null);

  const throttleHoverItem = _.throttle((item, index, movePlns) => {
    if (item.idx === index) {
      return null;
    }

    movePlns(item.idx, index);
    item.idx = idx;
  }, 1000);

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const [, drop] = useDrop<ItemType>(() => ({
    accept: 'pin',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, moniter) => {
      if (dragBoxRef.current === null) return;

      const dragIndex = item.idx;
      const hoverIndex = idx;

      const hoverBoundingRect = dragBoxRef.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = moniter.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      throttleHoverItem(item, idx, movePlns);
    },
  }));

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: 'pin',
    item: { id, idx },
    collect: (moniter) => ({
      isDragging: !!moniter.isDragging(),
    }),
    end: (item, moniter) => {
      const { idx: afterIndex } = item;
      const didDrop = moniter.didDrop();
      console.log(afterIndex, didDrop);
      // if (!didDrop) {
      //   movePlns(idx, afterIndex);
      // }
    },
  }));

  // const applyRef = useCallback((node: HTMLLIElement | null) => {
  //   dragBoxRef.current = node;
  //   drop(previewRef(node))
  // }, [])
  dragRef(drop(dragBoxRef));
  return (
    <li
      ref={dragBoxRef}
      className={`flex gap-[10px] h-[100px] transition-all ${
        isDragging ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-[65px]">
        <p>{idx + 1}</p>
        {idx < pinArrLength - 1 && (
          <div>
            <p>{betweenDistanceData}km</p>
          </div>
        )}
      </div>
      <div className="flex w-full border">
        <button
          // ref={dragRef}
          className=" flex justify-center items-center w-[50px] m-3"
        >
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
                className=" flex justify-center items-center w-[80px] h-[40px] border rounded-t-md cursor-pointer"
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
                className=" flex justify-center items-center w-[80px] h-[40px] border rounded-b-md cursor-pointer"
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
