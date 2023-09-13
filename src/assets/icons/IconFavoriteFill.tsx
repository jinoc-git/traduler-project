import type IconType from 'types/icon';

const IconFavoriteFill = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sm:w-[15px] sm:h-[15px] md:${w} md:${h}`}
    >
      <path
        d="M12 0L8.42313 8.09062L0 9.16712L6.21269 15.2442L4.58344 24L11.9999 19L19.4164 24L17.7872 15.2442L23.9999 9.16712L15.5767 8.09062L12 0Z"
        fill={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconFavoriteFill;
