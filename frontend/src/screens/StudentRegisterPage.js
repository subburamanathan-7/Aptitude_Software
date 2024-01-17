import React, {useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import useSound from 'use-sound';


import{useMutation, useQueryClient} from '@tanstack/react-query'
import { toast } from 'react-toastify'


import {Modal} from '../components/Modal'
import {registerStudent} from '../features/users/UserServices'

const forese = require('../assets/forese.png')
const beep = require('../assets/beep.mp3')


function StudentRegisterPage() {

    const [showModal,setShowModal] = useState(false)
	const [formData, setFormData] = useState(
        {fullName:"",regNo:"",email:"", role:"Student", dept:"",sessionCode:""})

    const [play] = useSound(beep);
    
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const loginMutation = useMutation({
        mutationFn:registerStudent,

        onSuccess:(data)=>{
            // console.log(data)
            sessionStorage.setItem('fullName',data.fullName)
            sessionStorage.setItem('regNo',data.regNo)
            sessionStorage.setItem('email',data.email)
            sessionStorage.setItem('role',data.role)
            sessionStorage.setItem('active',data.active)
            


            navigate('/dashboard')
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                navigator.keyboard.lock()
                disableBackButton()
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            play();
        },

        onError:(message)=>{
            // console.log(message)
            
        }
    })
    function disableBackButton() {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };
    }
   
	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setShowModal(true)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(formData)
        if(!formData.dept || !formData.email || !formData.fullName || !formData.regNo || !formData.role){
            
            toast.warn('Enter all the necessary details ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
        else{
            
            loginMutation.mutate({
                fullName:formData.fullName,
                regNo:formData.regNo,
                email:formData.email,
                dept:formData.dept,
                role:formData.role,
                sessionCode:formData.sessionCode
            })

        }
       

    }

	return (
		<>
        <div className=' flex flex-row justify-around items-center min-h-screen bg-[#8EA7E9]'>
            <div className='flex items-center justify-center py-[3%]'>
                <img 
                    className='object-fill w-40'
                    alt='logo'
                    src={forese} />

            </div>

            <form className='w-96 p-6 shadow-lg bg-white rounded-md text-[#7286D3]'>
                <h2 className='text-3xl block text-center font-semibold '><i className=' text-2xl fa-solid fa-user px-2'></i>Register</h2>
                <hr className='mt-3'/>
                <div className='mt-3'>
                    <label htmlFor='fullName' className='block font-semibold mb-2 text-base'>Full Name</label>
                    <input type='text' id ='fullName' 
                    name ="fullName"
                    className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                    placeholder='Enter Name...'
                    value={formData.fullName} 
                    onChange={handleChange}/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='regNo' className='block font-semibold mb-2 text-base'>Registration Number</label>
                    <input type='text' id ='regNo' 
                    name ="regNo"
                    className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                    placeholder='Enter Registration Number...'
                    value={formData.regNo} 
                    onChange={handleChange}/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='email' className='block font-semibold mb-2 text-base'>Email</label>
                    <input type='email' id ='email' 
                    name ="email"
                    className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                    placeholder='Enter Email...'
                    value={formData.email} 
                    onChange={handleChange}/>
                </div>
                
                <div className='mt-3'>
                    <label htmlFor='dept' className=' font-semibold block text-base mb-2'>Department:</label>
                    <select name='dept' id='dept' 
                    className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                    value={formData.dept} 
                    onChange={handleChange}>
                        <option value='' disabled selected hidden>Choose Department...</option>

                        <option value='AUT'> Automobile Engineering</option>
                        <option value='ADS'>AI & DS</option>
                        <option value='BIO'>Biotechnology</option>
                        <option value='CHE'>Chemical Engineering</option>
                        <option value='CIV'>Civil Engineering</option>
                        <option value='CSE'>Computer Science and Engineering</option>
                        <option value='EEE'>Electrical and Electronics Engineering</option>
                        <option value='ECE'>Electronics and Communication Engineering</option>
                        <option value='INT'>Information Technology</option>
                        <option value='MAR'>Marine Engineering</option>
                        <option value='MEC'>Mechanical Engineering</option>
                    </select>
                </div>

                <div className='mt-3'>
                    <label htmlFor='sessionCode' className='block font-semibold mb-2 text-base'>Session Code</label>
                    <input type='text' id ='sessionCode' 
                    name ="sessionCode"
                    className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                    placeholder='Enter SessionCode...'
                    value={formData.sessionCode} 
                    onChange={handleChange}/>
                </div>
                <div class="mt-3 flex justify-between items-center">
                    <div>
                        <label><a href='/admin' className='text-color3 font-semibold'>Admin Login</a></label>
                    </div>
                </div>
                <div className='mt-5'>
                    <button type='submit' 
                    className='cursor-pointer border-2 bg-[#7286D3] text-white py-1 w-full rounded font-semibold hover:opacity-75  hover:z-90 duration-150 ' 
                    onClick={onSubmit}>
                    Submit</button>
                </div>
            </form>

        </div> 
        <Modal isVisible={showModal} onClose={()=>{setShowModal(false)}}>
            <div className="relative overflow-x-auto ">
                <span className = "text-lg font-semibold px-[2%]">Please Confirm the Test Details</span>
                <br/>
                <br/>
                <table className="w-full text-md text-left rtl:text-right ">
                    <tr>
                        <th  className="px-6 py-3">
                            Full Name
                        </th>
                        <td className="px-6 py-3">
                           {formData.fullName}
                        </td>
                    </tr>
                    <tr>
                        <th className="px-6 py-3">
                            Registration Number 
                        </th>
                        <td className="px-6 py-3">
                           {formData.regNo}
                        </td>
                    </tr>
                    <tr>
                        <th className="px-6 py-3">
                            Email
                        </th>
                        <td className="px-6 py-3">
                           {formData.email}
                        </td>
                    </tr>
                    <tr>
                        <th className="px-6 py-3">
                            Department
                        </th>
                        <td className="px-6 py-3">
                           {formData.dept}
                        </td>

                    </tr>
                    <tr>
                        <th className="px-6 py-3">
                            Session Code:
                        </th>
                        <td className="px-6 py-3">
                           {formData.sessionCode}
                        </td>
                        
                    </tr>
                </table>
                <div className='flex items-center justify-center mt-5 text-white'>
                    <button className='px-[2%] cursor-pointer bg-[#D22B2B] focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                    type='submit' id='cancel' onClick={()=>{}}>
                        Cancel
                    </button>
                    <button className=' px-[2%] cursor-pointer bg-[#8EA7E9] focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                    type='submit' id='submit' onClick={handleSubmit}>
                        Take Test
                    </button>
                </div>
            </div>
        </Modal>
		</>
	)
}

export default StudentRegisterPage



