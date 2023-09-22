import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@components/common/header/Header';
import ProtectRoute from '@components/common/protectRoute/ProtectRoute';
import ScrollToTop from '@components/common/scrollToTop/ScrollToTop';
import SideBar from '@components/common/sideBar/SideBar';
import Loading from '@components/loading/Loading';
import AuthLoading from '@pages/AuthLoading';

const Landing = lazy(async () => await import('@pages/Landing'));
const Main = lazy(async () => await import('@pages/Main'));
const SignIn = lazy(async () => await import('@pages/SignIn'));
const SignUp = lazy(async () => await import('@pages/SignUp'));
const AddPlan = lazy(async () => await import('@pages/AddPlan'));
const Plan = lazy(async () => await import('@pages/Plan'));
const AddPhoto = lazy(async () => await import('@pages/AddPhoto'));
const Ending = lazy(async () => await import('@pages/Ending'));
const NotFound = lazy(async () => await import('@pages/NotFound'));
const ErrorPage = lazy(async () => await import('@pages/ErrorPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <ProtectRoute />
      <Header />
      <SideBar />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/plan/:id" element={<Plan />} />
          <Route path="/addPlan" element={<AddPlan />} />
          <Route path="/addPhoto/:id" element={<AddPhoto />} />
          <Route path="/ending/:id" element={<Ending />} />
          <Route path="/welcome" element={<AuthLoading />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;


// 1.5 MB	151 ms
// 731 kB	75 ms