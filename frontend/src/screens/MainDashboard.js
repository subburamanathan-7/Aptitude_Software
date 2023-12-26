import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { DashNavbar } from '../components/DashNavbar'

function MainDashboard() {
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        navigate('/testdashboard')
    }
    return (
        <>
        <div className='fixed top-0 left-0 right-0'>
            <DashNavbar  />
        </div>
            <div className='relative top-10  flex flex-wrap justify-center'>
                <div className='flex rounded-lg w-[90%] my-[3%] mx-[5%]'>
                    <div className='p-[2%] rounded-lg shadow-xl w-full max-w-screen '>
                        <div className=' text-center text-xl font-semibold my-[2%]'>
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
                className=" my-[2%] z-90 bg-[#7286D3] px-[3%] py-[1%] rounded-md drop-shadow-lg flex justify-center items-center text-white text-thin hover:opacity-80 hover:scale-95 duration-150">
                    Begin Test
                </button>
            </div>
        </>
    )
}

export default MainDashboard