import IconCamera from '@assets/icons/IconCamera';
import slider01 from '@assets/test1.png';
import slider02 from '@assets/test2.png';
import slider03 from '@assets/test3.png';
import { Arrow } from '@egjs/flicking-plugins';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
const Carousel = () => {
  const _plugins = [new Arrow()];

  return (
    <section className="p-5 md:p-10 pb-20 overflow-hidden">
      <label>
        <IconCamera /> 사진첩
      </label>
      <Flicking
        // panelsPerView={3}
        circular={true}
        plugins={_plugins}
      >
        <div className="relative cursor-pointer">
          <img src={slider01} alt="test1" className=" mx-10 rounded-3xl  " />
        </div>
        <div className="relative cursor-pointer">
          <img src={slider02} alt="test2" className=" mx-10 rounded-3xl" />
        </div>
        <div className="relative cursor-pointer">
          <img src={slider03} alt="test3" className=" mx-10 rounded-3xl  " />
        </div>

        <ViewportSlot>
          <span className="flicking-arrow-prev is-circle"></span>
          <span className="flicking-arrow-next is-circle"></span>
        </ViewportSlot>
      </Flicking>
    </section>
  );
};

export default Carousel;
