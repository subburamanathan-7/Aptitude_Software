import React, { useEffect, useState } from 'react'

import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom"

import { DashNavbar } from '../components/DashNavbar'
import { submitFeedback } from '../features/feedbacks/FeedbackServices';
import {feedbackCheck} from '../features/feedbacks/FeedbackServices';

function FeedbackPage() {
    const navigate = useNavigate();

    let content;

    const [rating1, setRating1] = useState(0);
    const [hover1, setHover1] = useState(0);

    const [rating2, setRating2] = useState(0);
    const [hover2, setHover2] = useState(0);

    const [comments,setComments] = useState('')

    const [submit,setSubmit] = useState(true)
    const [feedbackStatus,setFeedbackStatus] = useState(Boolean(false))

    const feedbackCheckQuery = useQuery({
        queryKey:['feedbackExists'],
        queryFn:()=>{
            return feedbackCheck(sessionStorage.getItem('user')) 
        },
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
    })
    if(feedbackCheckQuery.isLoading){
    }
    else if(feedbackCheckQuery.isSuccess ){
        if(feedbackStatus!==feedbackCheckQuery.data.feedbackExists){
            setFeedbackStatus(feedbackCheckQuery.data.feedbackExists)
        }
    //  console.log(feedbackCheckQuery.data)
        // console.log(feedbackStatus)

    }
    useEffect(()=>{
        if(!sessionStorage.getItem('user')){
            navigate('/register');
        }
        else{
            if(feedbackStatus){
                console.log(feedbackStatus)
                navigate('/response')
            }
        }
        
    },[feedbackStatus])
    const submitMutation = useMutation({
        mutationFn:submitFeedback,
        onSuccess:(data)=>{
            console.log(data)
            setSubmit(false)
            // console.log(data)

        },
        onError:(message)=>{
            console.log(message)
        }
    })

    const handleChange = (event) => {
        const value = event.target.value;
        setComments(value)
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        submitMutation.mutate({
            rating1,rating2,comments,token:sessionStorage.getItem('user')
        })
    }
    return (
        <>
            <div className='fixed top-0 left-0 right-0' >
                <DashNavbar/>
            </div>
            {submit?(<>
                <div className='flex rounded-lg w-[90%] justify-center items-center my-[5%] mx-[5%]'>
                <div className='p-[2%] rounded-lg shadow-xl w-full max-w-screen text-center'>
                    <div className='font-bold text-2xl'>
                        Give us your Feedback
                    </div>
                    <div className='px-[2%] py-[2%] text-left text-xl font-semibold'>
                        1.  How would you rate your experience with software?
                            <div className='px-[2%] py-[2%]'>
                                {
                                [...Array(5)].map((star, index) => {
                                    index += 1
                                    
                                
                                    return (
                                    <button type='button' 
                                    key={index}
                                    className={index <= (hover1 || rating1) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                    onClick= {() => {setRating1(index); console.log(index)} }  
                                    onMouseEnter={() => setHover1(index)}
                                    onMouseLeave={()=> setHover1(rating1)}>
                                    </button>
                                    
                                    )
                                })}
                            </div>
                    </div>

                    <div className='px-[2%] py-[2%] text-left text-xl font-semibold'>
                        2. How would you rate the difficulty of the question?
                            <div className='px-[2%] py-[2%]'>
                                {
                                [...Array(5)].map((star, index) => {
                                    index += 1
                                    
                                
                                    return (
                                    <button type='button' 
                                    key={index}
                                    className={index <= (hover2|| rating2) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                    onClick= {() => {setRating2(index); console.log(index)} }  
                                    onMouseEnter={() => setHover2(index)}
                                    onMouseLeave={()=> setHover2(rating2)}>
                                    </button>
                                    
                                    )
                                })}
                            </div>
                    </div>

                    <div className='px-[2%] py-[2%] text-left text-xl font-semibold'>
                            3. Do you have any suggestions?
                            
                    </div>
                    <div className='px-[2%] py-[2%] text-left text-xl font-semibold'>
                        <input type='text' placeholder='Suggestions...' onChange={handleChange} className='border h-[5vh] w-[50%]'/>
                    </div>
                    
                    <div className='flex items-center justify-center mt-5'>
                        <button className='bg-[#8EA7E9] text-[#000000]  focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mx-2 hover:scale-95 duration-150'
                        type='submit' id ='submit' onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
                </div>
            </>):(<>
                <div className='flex rounded-lg w-[90%] justify-center items-center my-[5%] mx-[5%]'>
                <div className='p-[2%] rounded-lg shadow-xl w-full max-w-screen text-center'>
                    <div className='font-semibold text-2xl'>
                        Congratulations on doing so well in your test, We knew you could do it!
                        <br/><br/>Thank you for your feedback. Please Logout 
                    </div>
                </div>
                </div>
            </>)}
        </>
    )
}

export default FeedbackPage