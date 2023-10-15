import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CreateVendor from './Create Vendor/CreateVendor';
import NavBar from './NavBar/NavBar';
import VendorList from './Vendors/Vendors';
import GoogleLogin from './GoogleLogin/GoogleLoginPage';
import PrivateRoutes from './Routes/PrivateRoutes';
import RestrictedRoutes from './Routes/RestrictedRoutes';
import { getCookies } from './Utils/cookiesUtil';



function App() {

  getCookies()


  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/createvendor" element={<CreateVendor />} />
          <Route path="/vendor" element={<VendorList />} />
        </Route>

        <Route path="/" element={<RestrictedRoutes />}>
          <Route path="/login" element={<GoogleLogin />} />
          <Route
            path="*"
            element={<h1>No Routes Found. Please go Back!!</h1>}
          />
        </Route>
      </Routes>

    </>
  );
}

export default App;
