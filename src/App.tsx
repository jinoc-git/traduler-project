/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ToastContainer, Zoom, toast } from 'react-toastify';

import ConfirmModal from '@components/common/confirm/ConfirmModal';
import { confirmStore } from '@store/confirmStore';
import { screenStore } from '@store/screenStore';
import { sideBarStore } from '@store/sideBarStore';
import _ from 'lodash';

import Router from './shared/Router';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { isOpen } = confirmStore();
  const { setScreenSize } = screenStore();

  useEffect(() => {
    const resize = _.debounce(() => {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      if (screenWidth >= 360 && screenWidth < 1110) setScreenSize('sm');
      if (screenWidth >= 1110 && screenWidth < 1440) setScreenSize('md');
      if (screenWidth >= 1440) setScreenSize('lg');
    }, 250);
    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  // const { pathname } = useLocation();
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);

  const installApp = () => {
    if (deferredPrompt === null) {
      toast.warn('이미 앱이 설치되어 있거나 앱을 설치할 수 없는 환경입니다');
      return;
    }

    deferredPrompt.prompt();
  };

  useEffect(() => {
    console.log('1');
    const handleBeforeInstallPrompt = (event: Event) => {
      console.log('2');
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      console.log('3');
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  return (
    <>
      <Router />
      <ToastContainer
        bodyClassName={() => 'text-sm font-white p-3 flex items-center'}
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}
      />
      {isOpen && <ConfirmModal />}
      {deferredPrompt !== null && (
        <div
          className={`flex flex-col fixed left-0 bottom-0 md:mb-[20px] sm:mb-[10px] items-center w-full
          ${isSideBarOpen ? 'md:pl-[270px]' : ''} duration-300
        `}
        >
          <button
            className="text-center w-ful rounded-[7px] text-white p-2 bg-blue_dark hover:bg-blue duration-300
            sm:font-semibold sm:gap-[10px] sm:mt-[10px] sm:w-[110px] sm:h-[35px] sm:text-sm
            md:mt-[35px] md:w-[150px] md:h-[50px] md:text-normal"
            onClick={() => {
              installApp();
            }}
          >
            앱 설치하기
          </button>
        </div>
      )}
    </>
  );
};

export default App;
