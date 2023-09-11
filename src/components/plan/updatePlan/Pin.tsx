/* eslint-disable @typescript-eslint/no-invalid-void-type */
import React, { useRef } from 'react';
import { type XYCoord, useDrop, useDrag } from 'react-dnd';

import { type PinContentsType } from '@api/pins';
import IconSixDots from '@assets/icons/IconSixDots';
import PinLayout from '@components/common/layout/PinLayout';
import { type Identifier } from 'dnd-core';

interface PinProps {
  id: string;
  pin: PinContentsType;
  idx: number;
  handleUpdate: (idx: number) => void;
  handleDelete: (idx: number) => void;
  movePins: (beforeIdx: number, afterIdx: number) => void;
  changeOrderAtDidDrop: () => void;
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
    handleUpdate,
    handleDelete,
    movePins,
    changeOrderAtDidDrop,
  } = props;

  const dragBoxRef = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<
    ItemType,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'pin',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, moniter) => {
      if (dragBoxRef.current === null) return;

      const dragIndex = item.idx;
      const hoverIndex = idx;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = dragBoxRef.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = moniter.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      movePins(dragIndex, hoverIndex);

      item.idx = idx;
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: 'pin',
    item: () => {
      return { id, idx };
    },
    collect: (moniter) => ({
      isDragging: moniter.isDragging(),
    }),
    end: (item, moniter) => {
      const didDrop = moniter.didDrop();

      if (didDrop) {
        changeOrderAtDidDrop();
      }
    },
  });

  drop(previewRef(dragBoxRef));

  return (
    <li
      ref={dragBoxRef}
      data-handler-id={handlerId}
      className={`transition-all ${isDragging ? 'opacity-30' : 'opacity-100'}`}
    >
      <PinLayout
        pin={pin}
        idx={idx}
        updatePin={handleUpdate}
        deletePin={handleDelete}
        isEnding={false}
      >
        <button
          ref={dragRef}
          className="flex-center md:w-[50px] md:p-3 sm:w-[30px] sm:p-1"
        >
          <IconSixDots
            w="md:w-[25px] sm:md:w-[15px]"
            h="md:h-[29px] sm:h-[18px]"
            fill="#646464"
          />
        </button>
      </PinLayout>
    </li>
  );
};

export default Pin;
