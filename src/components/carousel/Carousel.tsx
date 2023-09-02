import IconCamera from '@assets/icons/IconCamera';
import slider01 from '@assets/test1.png';
import slider02 from '@assets/test2.png';
import slider03 from '@assets/test3.png';
import { Perspective } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
const Carousel = () => {
  const _plugins = [new Perspective({ rotate: 0.5 })];

  return (
    <section className="p-5 md:p-10 pb-20 overflow-hidden w-2/3">
      <label>
        <IconCamera /> 사진첩
      </label>
      <Flicking
        panelsPerView={3}
        align="center"
        circular={true}
        plugins={_plugins}
      >
        <div className="relative cursor-pointer  brightness-75 hover:brightness-100 transition duration-400">
          <img
            src={slider01}
            alt="test1"
            className="w-full mx-20 h-full object-cover rounded-3xl "
          />
        </div>
        <div className="relative cursor-pointer brightness-75 hover:brightness-100 transition duration-400">
          <img
            src={slider02}
            alt="test2"
            className="w-full mx-20 h-full object-cover rounded-3xl "
          />
        </div>
        <div className="relative cursor-pointer brightness-75 hover:brightness-100 transition duration-400">
          <img
            src={slider03}
            alt="test3"
            className="w-full mx-20 h-full object-cover rounded-3xl"
          />
        </div>
      </Flicking>
    </section>
  );
};

export default Carousel;
