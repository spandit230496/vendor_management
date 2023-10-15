import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import nav from './nav.css'

const NavBar = () => {

    const navigate = useNavigate()
    const user = sessionStorage.getItem("authenticatedUser")

    const handleLogout = () => {
        sessionStorage.removeItem("authenticatedUser")
        navigate("/login")
    }

    useEffect(() => { }, [sessionStorage.getItem("authenticatedUser")])
    return (
        <div className='nav'>
            <h1>VENDOR MANAGEMENT</h1>
            {user ? <div className='links'>

                <NavLink to='/vendor' className='link'>Vendor</NavLink>
                <NavLink to='/createvendor' className='link'>Create Vendor</NavLink>
                {sessionStorage.getItem("authenticatedUser") ? <button className="danger" onClick={handleLogout}>Log Out</button> : ""}


            </div> : ""}


        </div>
    );
}

export default NavBar;
