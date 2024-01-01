import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { DashNavbar } from '../components/DashNavbar'
import { Modal } from '../components/Modal';
import ResetLogin from '../components/ResetLogin';
import SessionCard from '../components/SessionCard';

function AdminDashboard() {
    const navigate = useNavigate();
    const [showModal,setShowModal] = useState(false)
    const [sessionShowModal,setSessionShowModal] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem('role')!=='Admin'){
            navigate('/register');
          //   setResponseData(null)
        }
    },[])

    return (
        <>
            <div className='fixed top-0 left-0 right-0'>
                <DashNavbar/>
            </div>
            <Fragment>
                <div className=' p-10  min-h-screen'>
                    <button className=' m-[4%]  bg-[#8294C4] hover:scale-95 font-medium text-sm rounded-2xl px-5 py-2.5 text-center '
                        onClick={()=>setShowModal(true)}>
                            Reset Login
                    </button>

                    <button className=' m-[4%]  bg-[#8294C4] hover:scale-95 font-medium text-sm rounded-2xl px-5 py-2.5 text-center '
                        onClick={()=>setSessionShowModal(true)}>
                            Set Session
                    </button>
                </div>

                {/* Modals */}
                <Modal isVisible={showModal} onClose={()=>{setShowModal(false)}}>
                    <ResetLogin onClose={()=>{setShowModal(false)}}/>
                </Modal>
                <Modal isVisible={sessionShowModal} onClose={()=>{setSessionShowModal(false)}}>
                    <SessionCard onClose={()=>{setSessionShowModal(false)}}/>
                </Modal>
            </Fragment>
        </> 
    )
}

export default AdminDashboard