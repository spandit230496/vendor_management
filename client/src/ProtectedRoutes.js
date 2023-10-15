import { OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = () => {

    const [user, setUser] = useState(sessionStorage.getItem("authenticatedUser"))
    return (
        user ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoutes