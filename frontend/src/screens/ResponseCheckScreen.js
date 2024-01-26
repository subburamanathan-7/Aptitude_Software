import React,{useEffect} from 'react'
import { DashNavbar } from '../components/DashNavbar'

import { useNavigate } from "react-router-dom"

function ResponseCheckScreen() {
    const navigate = useNavigate()

    useEffect(()=>{
        if(!sessionStorage.getItem('user')){
            navigate('/register');
        }
    },[])
    return (
    <>
        <div className='fixed top-0 left-0 right-0 '>
            <DashNavbar/>
        </div>
        <div className=' my-[10%] flex rounded-lg w-[90%] justify-center items-center my-[5%] mx-[5%]'>
                <div className='p-[2%] rounded-lg shadow-xl w-full max-w-screen text-center'>
                    <div className='font-semibold text-2xl'>
                        Congratulations on doing so well in your test, We knew you could do it!
                        <br/><br/>Thank you for your feedback. Please Logout 
                    </div>
                </div>
        </div>
    </>
    )
}

export default ResponseCheckScreen