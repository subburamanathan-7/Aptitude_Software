import React,{useRef, useEffect,useState, Fragment} from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom'

import {Modal} from './Modal'
import ModalCheck from './ModalCheck'

const forese = require('../assets/forese.png')

export function TestNavbar({handleSubmit}) {
    
	const [timer, setTimer] = useState("00:00:00");
    const [showSubmit,setShowSubmit] = useState(false)
    const [responseStatus,setResponseStatus] = useState(Boolean(false))

    const navigate = useNavigate()
	const Ref = useRef()


    const getTimeRemaining = (e) => {

		const total =
			Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor(
			(total / 1000 / 60) % 60
		);
		const hours = Math.floor(
			(total / 1000 / 60 / 60) % 24
		);
		return {
			total,
			hours,
			minutes,
			seconds,
		};
	};

    const startTimer = (e) => {
		let { total, hours, minutes, seconds } =
			getTimeRemaining(e);
		if (total > 0) {
			// update the timer
			// check if less than 10 then we need to
			// add '0' at the beginning of the variable
			setTimer(
				(hours > 9 ? hours : "0" + hours) +
					":" +
					(minutes > 9
						? minutes
						: "0" + minutes) +
					":" +
					(seconds > 9 ? seconds : "0" + seconds)
			);
		}
        if(total===0){
           handleSubmit(timer)
        }
        
	};

	const clearTimer = (e) => {
		// If you adjust it you should also need to
		// adjust the Endtime formula we are about
		// to code next
		setTimer("00:00:60");

		// If you try to remove this line the
		// updating of timer Variable will be
		// after 1000ms or 1sec
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);

		}, 1000);
		Ref.current = id;
	};
	const getDeadTime = () => {
		let deadline = new Date();

		// This is where you need to adjust if
		// you entend to add more time
		deadline.setSeconds(deadline.getSeconds() + 60);
		return deadline;
	};
	useEffect(() => {
		clearTimer(getDeadTime());
	}, []);

    
  return (
   <>
        <header className='bg-[#8294C4] mb-[2%]'>
            <nav className='px-[3%] flex justify-between items-center  mx-auto py-2'>
                <div>
                    <img className='w-16'
                    alt='forese-logo'
                    src={forese} />
                </div>
                <div className='pl-[10%]'>
                    <span className='text-white text-xl'>{timer}</span>
                </div>

                <div className=''>
                                
                    <button className=' mr-2 ml-2 bg-[#DBDFEA] text-[#000000] px-5 py-2 rounded-full hover:scale-95 duration-150' 
                    onClick={()=>{
                        setShowSubmit(true)
                    }} >
                        <i className=" px-2 fa-solid fa-arrow-right-from-bracket"></i>    
                        Submit Test 
                    </button>
                </div>
               
            </nav>
        </header>
        <Modal isVisible={showSubmit} onClose={()=>{setShowSubmit(false)}}>
            <ModalCheck firstText='Do you wish to exit the Test?' secondText='Submit' onClick={()=>{
                sessionStorage.setItem('time',timer)
                handleSubmit()}}/>
        </Modal>

       
       
       
   </>
  )
}
