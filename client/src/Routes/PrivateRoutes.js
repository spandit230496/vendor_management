import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getCookies } from "../Utils/cookiesUtil";

const PrivateRoutes = () => {
    console.log("hi")
    return <div>{getCookies() ? <Outlet /> : <Navigate to="/login" />}</div>;

};

export default PrivateRoutes;