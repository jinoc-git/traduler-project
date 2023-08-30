import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@components/common/header/Header';
import SideBar from '@components/common/sideBar/SideBar';
import AddPhoto from '@pages/AddPhoto';
import AddPlan from '@pages/AddPlan';
import AuthLoading from '@pages/AuthLoading';
import Ending from '@pages/Ending';
import Main from '@pages/Main';
import NotFound from '@pages/NotFound';
import Plan from '@pages/Plan';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <SideBar />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plan/:id" element={<Plan />} />
        <Route path="/addPlan" element={<AddPlan />} />
        <Route path="/ending/:id" element={<Ending />} />
        <Route path="/addPhoto" element={<AddPhoto />} />
        <Route path="/welcome" element={<AuthLoading />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
