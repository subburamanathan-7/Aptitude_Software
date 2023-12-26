import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { DashNavbar } from '../components/DashNavbar'


function AdminDashboard() {
    const navigate = useNavigate();
    return (
        <>
            <DashNavbar/>
        </> 
    )
}

export default AdminDashboard