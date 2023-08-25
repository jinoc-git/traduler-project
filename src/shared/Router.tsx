import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@components/common/header/Header';
import SideBar from '@components/common/sideBar/SideBar';
import AddPlan from '@components/plan/addPlan/AddPlan';
import Ending from '@pages/Ending';
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
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/addPlan" element={<AddPlan />} />
        <Route path="/ending" element={<Ending />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
