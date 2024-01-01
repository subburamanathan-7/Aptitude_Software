import React, { useState } from 'react'
import{useMutation, useQueryClient} from '@tanstack/react-query'


import { resetLogin } from '../features/users/UserServices';
function ResetLogin(onClose) {
    
    const [registerNumber,setRegisterNumber] = useState("");

    const resetLoginMutation = useMutation({
        mutationFn:resetLogin,
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(message)=>{
            console.log(message)
        }

    }) 

    const handleChange = (e)=>{
        setRegisterNumber(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(registerNumber)

        resetLoginMutation.mutate({
            regNo:registerNumber,
            token:sessionStorage.getItem('user')
        })
    }

    return (
    <>
         <div className=''>
            <div className='container mx-auto'>
                <div className='flex flex-col py-12 px-12'>
                    <h3 className='text-xl mb-4 text-center text-[#00000]'>Reset Login</h3>
                    <form>
                        <div className='mt-2'>
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 w-full rounded`} placeholder='Register Number'
                            type='text' name='regNo' value={registerNumber} onChange={handleChange}/>
                        </div>
                    </form>
                    <div className='flex items-center justify-center mt-5'>
                        <button className='bg-[#8EA7E9] text-[#000000]  focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                        type='submit' id ='submit' onClick={handleSubmit}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ResetLogin