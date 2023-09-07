import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@components/common/header/Header';
import ProtectRoute from '@components/common/protectRoute/ProtectRoute';
import SideBar from '@components/common/sideBar/SideBar';
import AddPhoto from '@pages/AddPhoto';
import AddPlan from '@pages/AddPlan';
import AuthLoading from '@pages/AuthLoading';
import Ending from '@pages/Ending';
import ErrorPage from '@pages/ErrorPage';
import Landing from '@pages/Landing';
import Main from '@pages/Main';
import NotFound from '@pages/NotFound';
import Plan from '@pages/Plan';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <ProtectRoute />
      <Header />
      <SideBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plan/:id" element={<Plan />} />
        <Route path="/addPlan" element={<AddPlan />} />
        <Route path="/ending/:id" element={<Ending />} />
        <Route path="/addPhoto/:id" element={<AddPhoto />} />
        <Route path="/welcome" element={<AuthLoading />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
