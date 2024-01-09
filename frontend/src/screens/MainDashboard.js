import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate,  } from "react-router-dom"

import { useQuery,useMutation } from '@tanstack/react-query';
import {responseCheck} from '../features/responses/ResponseServices'

import { DashNavbar } from '../components/DashNavbar'

import { getSession } from '../features/users/UserServices';

function MainDashboard(props) {
    const navigate = useNavigate();
    const [responseStatus,setResponseStatus] = useState(Boolean(false))
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const getSessionMutation = useMutation({
		mutationFn:getSession,
		onSuccess:(data)=>{
			console.log(data)
			console.log(data?.currentSession[0].endTime)
            sessionStorage.setItem('endTime',data?.currentSession[0].endTime)
		},
		onError:(message)=>{
			console.log(message)
		}
    })

    useEffect(() => {
		getSessionMutation.mutate()
	}, []);

    const handleSubmit=(e)=>{
        navigate('/testdashboard')
        disableBackButton()
    }
    
    const responseCheckQuery = useQuery({
        queryKey:['responseExists'],
        queryFn:()=>{
            return responseCheck(sessionStorage.getItem('user')) 
        },
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
    })
    if(responseCheckQuery.isLoading){
    }
    else if(responseCheckQuery.isFetched ){
        if(responseStatus!==responseCheckQuery.data.responseExists){
            setResponseStatus(responseCheckQuery.data.responseExists)
        }
    //    console.log(responseCheckQuery.data)
    //    console.log(responseStatus)
    }
    useEffect(()=>{
        if(!sessionStorage.getItem('user')){
            navigate('/register');
        }
        else{
            if(responseStatus){
                navigate('/feedback')
            }
        }
       
    },[responseStatus]);

    

    function disableBackButton() {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };
    }
    const onConfirmRefresh = function (event) {
        event.preventDefault();
        return event.returnValue = "Are you sure you want to leave the page?";
    }
     
    useEffect(()=>{
      window.addEventListener("beforeunload", onConfirmRefresh, { capture: true });

    },[])
   
    return (
        <>
        <div className='fixed top-0 left-0 right-0'>
            <DashNavbar/>
        </div>
        
        <div className='flex flex-wrap justify-center my-[2%]'>
            <div className='flex rounded-lg w-[90%] my-[5%] mx-[5%]'>
                <div className='p-[3%] rounded-lg shadow-md w-full max-w-screen '>
                    <div className=' text-center text-xl font-semibold '>
                        Read Instructions Carefully:<br/>
                        <br/>Do read all instructions provided on the test paper or application interface carefully before starting the test.
                    </div>     
                    <div className='text-left leading-8'>
                        1.Do allocate your time wisely to attempt all sections of the test. Don't spend too much time on a single question.<br/>
                        2.Do attempt to answer every question, even if you are unsure. There is no penalty for guessing.<br/>
                        3.Do stay calm and focused throughout the test. Take deep breaths if needed and concentrate on each question.<br/>
                        4.Do use any remaining time to review your answers. Ensure that you haven't missed any questions.<br/>
                    </div>
                    <div className=' text-center text-xl font-semibold my-[2%]'>
                        Composition of the Test:
                        There are 50 questions on the test, each consiting of 4 options, out of which only one is correct.
                    </div> 
                    <div className='text-left leading-8'>
                        <ul>
                            <li>1.<span className='px-1'></span>Questions 1-10 will test your quantitative ability.</li>
                            <li>2.<span className='px-1'></span>Questions 11-20 will test your verbal reasoning.</li>
                            <li>3.<span className='px-1'></span>Questions 21-40 will test your core knowledge.</li>
                            <li>4.<span className='px-1'></span>Questions 41-50 will test your programming skills.</li>
                        </ul>
                    </div>
                </div>
            </div>        

            <button onClick={handleSubmit} title="Take Test"
            className="bg-[#7286D3] px-[3%] py-[1%] rounded-md drop-shadow-lg flex justify-center items-center text-white text-thin hover:opacity-80 hover:scale-95 duration-150">
                Begin Test
            </button>
        </div>
        </>
    )
}

export default MainDashboard