import React from "react";

import { Outlet, Navigate } from "react-router-dom";
import { getCookies } from "../Utils/cookiesUtil";

const RestrictedRoutes = () => {
    return (
        <div>
            {getCookies() ? <Navigate to="/vendor" /> : <Outlet />}
        </div>
    );
};

export default RestrictedRoutes;
