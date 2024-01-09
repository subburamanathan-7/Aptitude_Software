import React, { useState } from 'react'
import{useMutation, useQueryClient} from '@tanstack/react-query'


import { createSession } from '../features/users/UserServices';
function SessionCard(onClose) {
    
    const [sessionCode,setSessionCode] = useState("");
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")



    const SessionCardMutation = useMutation({
        mutationFn:createSession,
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(message)=>{
            console.log(message)
        }
    }) 

    const handleChange = (e)=>{
        setSessionCode(e.target.value)
    }
    const handleAnotherChange = (e)=>{
        setStartTime(e.target.value)
    }
    const onChange = (e)=>{
        setEndTime(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(sessionCode)

        SessionCardMutation.mutate({
            sessionCode:sessionCode,
            startTime:startTime,
            endTime:endTime,
            token:sessionStorage.getItem('user')
        })
    }

    return (
    <>
         <div className=''>
            <div className='container mx-auto'>
                <div className='flex flex-col py-12 px-12'>
                    <h3 className='text-xl mb-4 text-center text-[#00000]'>Set Session Code for the Test</h3>
                    <form>
                        <div className='mt-2'>
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 w-full rounded`} placeholder='Session Code '
                            type='text' name='sessionCode' value={sessionCode} onChange={handleChange}/>
                        </div>

                        <div className='mt-2'>
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 w-full rounded`} placeholder='Start Time '
                            type='text' name='startTime' value={startTime} onChange={handleAnotherChange}/>
                        </div>

                        <div className='mt-2'>
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 w-full rounded`} placeholder='Start Time '
                            type='text' name='startTime' value={endTime} onChange={onChange}/>
                        </div>

                    </form>
                    <div className='flex items-center justify-center mt-5'>
                        <button className='bg-[#8EA7E9] text-[#000000]  focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                        type='submit' id ='submit' onClick={handleSubmit}>
                            Set
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default SessionCard