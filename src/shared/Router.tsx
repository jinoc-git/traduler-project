import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@components/common/header/Header';
import SideBar from '@components/common/sideBar/SideBar';
import AddPlan from '@components/plan/addPlan/AddPlan';
import AddPhoto from '@pages/AddPhoto';
import Main from '@pages/Main';
import Plan from '@pages/Plan';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <SideBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plan/:id" element={<Plan />} />
        <Route path="/addPlan" element={<AddPlan />} />
        <Route path="/addPhoto" element={<AddPhoto />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
