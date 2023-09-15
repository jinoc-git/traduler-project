// 스크롤 잠금
export const enableScrollLock = () => {
  const { body } = document;

  if (body.getAttribute('scrollY') == null) {
    const pageY = window.pageYOffset;

    body.setAttribute('scrollY', pageY.toString());

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.left = '0px';
    body.style.right = '0px';
    body.style.bottom = '0px';
    body.style.top = `-${pageY}px`;
  }
};

// 스크롤 잠금 해제
export const disableScrollLock = () => {
  const { body } = document;

  if (body.getAttribute('scrollY') != null) {
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('left');
    body.style.removeProperty('right');
    body.style.removeProperty('bottom');

    window.scrollTo(0, Number(body.getAttribute('scrollY')));

    body.removeAttribute('scrollY');
  }
};
