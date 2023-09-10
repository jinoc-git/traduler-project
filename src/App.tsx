/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';

import ConfirmModal from '@components/common/confirm/ConfirmModal';
import { confirmStore } from '@store/confirmStore';
import { screenStore } from '@store/screenStore';
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

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
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
    </>
  );
};

export default App;
