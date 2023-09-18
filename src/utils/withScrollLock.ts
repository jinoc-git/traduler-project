// 스크롤 잠금
const eventFunc = (event: TouchEvent) => {
  event.preventDefault();
};
export const enableScrollLock = () => {
  document.addEventListener('touchmove', eventFunc, { passive: false });
};

// 스크롤 잠금 해제
export const disableScrollLock = () => {
  document.removeEventListener('touchmove', eventFunc);
};
