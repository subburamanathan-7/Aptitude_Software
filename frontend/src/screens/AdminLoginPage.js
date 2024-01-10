import React, {useState } from 'react'
import { useNavigate } from "react-router-dom"

import  {toast} from 'react-toastify';


import{useMutation, useQueryClient} from '@tanstack/react-query'
import {adminLogin} from '../features/users/UserServices'

const forese = require('../assets/forese.png')

function AdminLoginPage() {
    const [formData, setFormData] = useState({regNo:"", password:"",role:"Admin"})
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn:adminLogin,
        onSuccess:(data)=>{
            sessionStorage.setItem('fullName',data.fullName)
            sessionStorage.setItem('dept',data.dept)
            sessionStorage.setItem('regNo',data.regNo)
            sessionStorage.setItem('email',data.email)
            sessionStorage.setItem('role',data.role)
            sessionStorage.setItem('active','')

            toast.success('Hello Admin', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            navigate('/adashboard')
            // console.log(sessionStorage.getItem('user'))
        },
        onError:(message)=>{
            // console.log(message)
            toast.error('Invalid Credentials', {
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
    })
	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)

        if(!formData.regNo || !formData.password){
            toast.warn('Enter all the details', {
                position: "top-right",
                autoClose: 3000,
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
                regNo:formData.regNo,
                password:formData.password,
            })
        }
    }
	return(
		<>
			<div className='min-h-screen flex flex-row justify-around items-center h-screen bg-[#8EA7E9]'>
                <div className='flex items-center justify-center mt-[-3%] py-[3%]'>
                    <img 
                        className='object-fill w-40'
                        alt='logo'
                        src={forese} />

                </div>
                <form className='w-96 p-6 shadow-lg bg-white rounded-md text-[#7286D3]'>
                    <h2 className='text-3xl block text-center font-semibold '><i className=' text-2xl fa-solid fa-user px-2'></i>Admin Login</h2>
                    <hr className='mt-3'/>
                   
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
                        <label htmlFor='password' className='block text-base mb-2 font-base'>Password</label>
                        <input type='password' id ='password' 
                        name='password'
                        className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                        placeholder='Enter Password...'
                        value={formData.password} 
                        onChange={handleChange}/>
                    </div>
                    <div class="mt-3 flex justify-between items-center">
                        <div>
                            <label><a href='/register' className='text-color3 font-semibold'>Student Register</a></label>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <button type='submit' 
                        className='cursor-pointer border-2 bg-[#7286D3] text-white py-1 w-full rounded font-semibold hover:opacity-75  hover:z-90 duration-150 ' 
                        onClick={handleSubmit}>
                        Submit</button>
                    </div>
                </form>
            </div> 
		
		</>
	)
}

export default AdminLoginPage
