import React,{useRef, useEffect,useState, Fragment} from 'react'
import { useNavigate } from 'react-router-dom'

import {Modal} from './Modal'

import { useMutation } from '@tanstack/react-query'
import {logout} from '../features/users/UserServices'
import ModalCheck from './ModalCheck'
const forese = require('../assets/forese.png')

export function DashNavbar() {
    
    const [showModal,setShowModal] = useState(false)
    
    const navigate = useNavigate()

    const logoutMutation = useMutation({
        mutationFn:logout,
        onSuccess:(data)=>{
            sessionStorage.removeItem('fullName')
            sessionStorage.removeItem('regNo')
            sessionStorage.removeItem('email')
            sessionStorage.removeItem('role')
            sessionStorage.removeItem('dept')
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('active')
            sessionStorage.removeItem('session')


            navigate('/')
        },
        onError:(message)=>{
            console.log(message)
        }

    })
    
    const onLogout =(e)=>{
        e.preventDefault();
        setShowModal(true)

    }
    const handleLogout =()=>{
        console.log('Hello')
        logoutMutation.mutate(sessionStorage.getItem('user'))
    }

  return (
   <>
        <header className='bg-[#8294C4] mb-[2%]'>
            <nav className='px-[3%] flex justify-between items-center  mx-auto py-2'>
                <div>
                    <img className='w-16'
                    alt='forese-logo'
                    src={forese} />
                </div>

                <div className=''>
                   
                    <button className=' mr-2 ml-2 bg-[#DBDFEA] text-[#000000] px-5 py-2 rounded-full hover:scale-95 duration-150' 
                    onClick={onLogout} >
                        <i className=" px-2 fa-solid fa-arrow-right-from-bracket"></i>    
                        Logout 
                    </button>
                
                </div>
            </nav>
        </header>
        
        <Modal isVisible={showModal} onClose={()=>{setShowModal(false)}}>
            <ModalCheck firstText={'Do you wish to Logout?'} secondText={"Logout"} onClick={handleLogout}/>
        </Modal>
       
   </>
  )
}
