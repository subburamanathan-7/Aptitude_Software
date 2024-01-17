import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import {Drawer} from "@material-tailwind/react";
import {toast} from 'react-toastify'
import useSound from 'use-sound';


import axios from 'axios';
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query';

import { Card } from '../components/Card';
import { CountCard } from '../components/CountCard';
import { TestNavbar } from '../components/TestNavbar'



import {listQuestions} from '../features/responses/ResponseServices';
import { submitTest } from '../features/responses/ResponseServices';
import {responseCheck} from '../features/responses/ResponseServices';
const beep = require('../assets/beep.mp3')


function MainDashboard() {
    let content="",questionList=[],count=0;
    const navigate = useNavigate();
    const Ref = useRef()
    const [play] = useSound(beep);


    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [paginateCount,setPaginateCount] = useState(0)
    const [selectedIndexes, setSelectedIndexes] = useState(Array(50).fill(""));

    const [selectedOptions, setSelectedOptions] = useState(Array(50));
    const [attemptedCount, setAttemptedCount] = useState(0);
    const [switchCount, setSwitchCount] = useState(0)
    const [responseStatus,setResponseStatus] = useState(Boolean(false))
    const [open, setOpen] = useState(false);

    const [showFilter,setShowFilter] = useState(false)
    const [filterParam,setFilterParam]=useState('')

    const [limitParam,setLimitParam] = useState(Number(5));

    const [endTime, setEndTime] = useState(sessionStorage.getItem('endTime'))
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
 


    const responseCheckQuery = useQuery({
        queryKey:['responseExists'],
        queryFn:()=>{
            return responseCheck(sessionStorage.getItem('user')) 
        },
    })
    if(responseCheckQuery.isLoading){
    }
    else if(responseCheckQuery.isSuccess ){
        if(responseStatus!==responseCheckQuery.data.responseExists){
            setResponseStatus(responseCheckQuery.data.responseExists)
        }
    //    console.log(responseCheckQuery.data)
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
        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                // console.log("tab is active",switchCount)
            
            } else {
                setSwitchCount(prev=>prev+1)
                play();
            }
        });
        if(switchCount>=10){
            // handleSubmit(sessionStorage.getItem('time'))
        }
    },[switchCount,setSwitchCount,responseStatus]) 

   
    const submitMutation = useMutation({
        mutationFn:submitTest,
        onSuccess:(data)=>{
            // console.log(data)
            toast.success('Your Response was Recorded', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            disableBackButton()
            navigate('/feedback')
        },
        onError:(message)=>{
            // console.log(message)
            toast.error('Try Again', {
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

    const headPrevious =()=>{
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'});

        // console.log(selectedIndexes)
        
        // if(showFilter){
        // }
        // else{
            if(currentQuestion>0)
            setCurrentQuestion(prev => prev-1)
        // }
        
    }

    const headForward =()=>{
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'});

        // console.log(selectedIndexes)
        // if(showFilter){
        // }
        // else{
            if(currentQuestion<questionList.length-1)
            setCurrentQuestion(prev => prev+1)
        // }
        
    }

  

    const handleSelection=(answerString,questionID)=>{
        
        const updatedIndexes = [...selectedIndexes];
        updatedIndexes[currentQuestion] = currentQuestion;
        setSelectedIndexes(updatedIndexes);

        const updatedOptions = [...selectedOptions];

        updatedOptions[currentQuestion] = new Object();
        updatedOptions[currentQuestion].questionID = questionID;
        updatedOptions[currentQuestion].answerString = answerString;

        setSelectedOptions(updatedOptions);

        if(!selectedIndexes.includes(currentQuestion)){
            setAttemptedCount(prev=>prev+1)
        }
        // console.log(selectedOptions)
        // let searchIndex = responses.findIndex((question) => question.key===currentQuestion+1);
        // if(searchIndex>=0){
        //     responses[searchIndex].answer = answerString;
        //     // responses[searchIndex].answerIndex = index+1;
        // }
        // else{
        //     responses.push({
        //         key:currentQuestion+1,
        //         answer:answerString,
        //         // answerIndex:index+1
        //     })
        // }
        // setResponses(responses)
        // console.log(responses)
    }

    
    const handleSubmit =()=>{
        let endTotal=0;
        if(endTime){
            let endHours =  Number(endTime[0] ? endTime[0] + endTime[1] : endTime[1]);
            let endMinutes = Number(endTime[3]+endTime[4]);
            let endSeconds = Number(endTime[6]+endTime[7]);
    
            let dnow = new Date();
            let currentHours = dnow.getHours(); // => 6
            let currentMinutes = dnow.getMinutes(); // =>  00
            let currentSeconds = dnow.getSeconds(); // => 00
    
            if(Number(currentSeconds) > endSeconds){
                endSeconds += 60;
                if(endMinutes===0){
                    --(endHours);
                    (endMinutes)+=60;
                }
                --endMinutes;
            }
    
            if(Number(currentMinutes) > endMinutes){
                endMinutes += 60;
                --endHours;
            }
    
            let diffSeconds = endSeconds - Number(currentSeconds);
            let diffMinutes = endMinutes - Number(currentMinutes);
            let diffHours = endHours - Number(currentHours);
    
            // console.log({diffHours,diffMinutes,diffSeconds})
    
            endTotal=endTotal+ (Number(diffHours)*3600);
            endTotal=endTotal+ (Number(diffMinutes)*60);
            endTotal = endTotal+Number(diffSeconds);
            // console.log(endTotal)
            // setRemainingTime(endTotal)
    
            
        }

        if(responseStatus){
            return null;
        }

        submitMutation.mutate({
            selectedOptions:selectedOptions,
            timeTaken:5400-endTotal,
            switchCount:switchCount,
            token:sessionStorage.getItem('user')
        })

    }

    const paginateQuestions = async({pageParam})=>{
        // console.log(pageParam?pageParam:1)

        const token = sessionStorage.getItem('user')

        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
        // console.log({pageParam, sectionState})
        const res = await axios.get(`http://localhost:5000/api/question/paginatequestions?page=${pageParam}&limit=${limitParam}`,config);
        // console.log(res.data)
        return res.data;
    }

    const {data, status, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched} = useInfiniteQuery({
        queryKey:['pquestions'],
        queryFn:paginateQuestions,
        initialPageParam:1,
        refetchOnWindowFocus:false,
        getNextPageParam:(lastPage, allPage)=>{
            const nextPage = lastPage.length ? allPage.length+1 : undefined
            return nextPage;
        }
    })
    useEffect(()=>{
        if(limitParam>5)
            fetchNextPage()
    },[limitParam])
   
    const handleSection = (section)=>{

        console.log(questionList.length)
        if(questionList.length<50 && section==='verbal'){}
        else if(questionList.length<50 && section==='aptitude'){
            setLimitParam(50)
        }
        else if(questionList.length<50 && section==='core'){
            setLimitParam(50);
        }
        else if(questionList.length<50 && section==='coding'){
            setLimitParam(50);
        }
    }
    const changeSection = (section)=>{
        let  searchIndex = questionList.findIndex((question) => question.questionCategory===section);
        if(searchIndex>=0){
            setCurrentQuestion(searchIndex)
            closeDrawer()
        }
    }

    // content = data?.pages[0]
    // questionList = content
    
    content = data?.pages.map(responoses=>responoses?.map(question=>{
        questionList.push(question)
        // return(
        //     <div className='m-2 p-2 bg-green' key={question.id}>{question.questionString}</div>
        // )
    }))
    
    
    // console.log(questionList)


    // const listQuestionSet = useQuery({
    //     queryKey:['questions'],
    //     queryFn:()=>{
    //         return listQuestions(sessionStorage.getItem('user')) 
    //     },
    // })

    // if(listQuestionSet.isLoading){
    // }
    // else if(listQuestionSet.isFetched ){
    //     // console.log("Questions Fetched")
    //     content = listQuestionSet.data
    //     questionList = content
    // }


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


    return(
        <>
            <div className=''>
            <div className='fixed top-0 left-0 right-0'>
                <TestNavbar handleSubmit={()=>{handleSubmit()}}/>
            </div>

            <Fragment>
                <div className={`my-[4%] p-[2%] bg-opacity-60 min-h-screen  `}>

                   
                    {/* Pull Sidebar */}
                    {/* <div> SwitchCount:{switchCount}</div>  */}

                    <div>
                        <button 
                            onClick={()=>{
                                window.scroll({
                                top: 0, 
                                left: 0, 
                                behavior: 'smooth'});
                                openDrawer()
                            }} title="Open Left"
                            className={`fixed left-2 top-20  bg-[#8294C4] px-[2%] py-[1%] rounded-md drop-shadow-lg text-white hover:bg-white hover:text-[#000000] duration-150 cursor-pointer`}>
                            <i class="fa-solid fa-angles-left"></i>
                        </button>
                
                        <div className=''>
                            <div className={` ${open}? 'fixed inset-0 backdrop-blur-sm':'' `}>
                            <Drawer placement='left' open={open} onClose={closeDrawer} className=" mt-[5%] py-4 px-2 z-10 ">
                               
                                <div className="flex items-center justify-between ">
                                    <h2 className='mt-[3%] underline font-semibold '>Analysis</h2>
                                    <button className=''>
                                        <i onClick={closeDrawer} className=" text-lg  font-semibold fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <i className=" text-green text-sm fa-solid fa-circle-info"></i>
                                    <span className='text-sm px-[2%] cursor-pointer'>Choose the category & ensure your responses. </span>

                                </div>
                                <div className='mt-[4%] flex flex-col items-center justify-between' >
                                        <CountCard name={'Total'}  count={50} onClick={()=>{
                                            setShowFilter(false);
                                            setFilterParam('')
                                        }} />
                                        <CountCard name={'Attempted'} count={attemptedCount} onClick={()=>{
                                            setShowFilter(true);
                                            setFilterParam('attemped')
                                        }}/>
                                        <CountCard name={'Not Attempted'} count={50-(Number(attemptedCount))} onClick={()=>{
                                            setShowFilter(true);
                                            setFilterParam('notattemped')
                                        }}/>
                                </div>

                                <div className="mt-[12%] flex items-center justify-between ">
                                    <h2 className='underline font-semibold'>Sections</h2>
                                    {/* <button className=''>
                                        <i onClick={closeDrawer} className=" text-lg  font-semibold fa-solid fa-xmark"></i>
                                    </button> */}
                                </div>
                                <div>
                                    <i className=" text-green text-sm fa-solid fa-circle-info">
                                    </i>
                                    <span className='text-sm px-[2%] cursor-pointer'>Choose the section you wish to navigate through.</span>

                                </div>
                                <div className='mt-[4%] flex flex-col items-center justify-between' >
                                        <Card className="" name={"Verbal"} onClick={()=>{
                                            handleSection('verbal')
                                            changeSection('verbal')
                                        }}/>
                                        <Card className="" name={"Aptitude"} onClick={()=>{
                                            handleSection('aptitude')
                                            changeSection('aptitude')
                                        }}/>
                                        <Card className="" name={"Core"} onClick={()=>{
                                            handleSection('core')
                                            changeSection('core')
                                        }}/>
                                        <Card className="" name={"Coding"} onClick={()=>{
                                            handleSection('coding')
                                            changeSection('coding')
                                        }}/>
                                </div>

                            </Drawer>
                            </div>
                        </div>
                    </div>
                
                    {/* Questions  */}
                        
                    {
                        questionList.length>0?
                        (
                        <div className={`flex rounded-lg w-[90%] justify-center items-center my-[2%] mx-[5%] `}>
                        <div className='p-[2%] rounded-lg shadow-md w-full max-w-screen text-center'>
                        
                            <div className=' text-xl font-semibold my-[2%]'>
                                <div className=' flex flex-row'>
                                    <span key={currentQuestion + 1}>Q {currentQuestion + 1}:</span>
                                    <div className='' key={currentQuestion}>
                                        {questionList[currentQuestion].questionString}
                                    </div>
                                </div>
                                <div className='w-full text-semibold flex flex-col mt-[2%]'>
                                
                                {
                                    questionList[currentQuestion].questionOptions.map((option) => {
                                    return(
                                        <button  
                                        key={option.questionAnswer}
                                        className= {`mx-[6%] my-2 px-[2%] py-4 rounded-md  border-2 border-[#7286D3] hover:scale-95 transition-all duration-150
                                        ${selectedOptions[currentQuestion]?selectedOptions[currentQuestion].answerString === option.answerString ? 'bg-[#7286D3]':'bg-[#fff]':'bg-[#fff]'}`}
                                        onClick={()=>{
                                            handleSelection(option.answerString,questionList[currentQuestion]._id)}}>
                                            {option.answerString}
                                        </button>
                                    )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        </div>
                        ):(<></>)
                    }

                        {/* Navigate */}
                        <div className='my-[2%]'>
                        
                            <div className='flex flex-wrap justify-between mx-[5%]'>
                                <button onClick={()=>headPrevious()} title="Previous Question"
                                className="bg-[#7286D3] px-[2%] py-[1%] rounded-md drop-shadow-lg flex justify-center items-center text-white text-thin hover:opacity-80 hover:drop-shadow-2xl">
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <span className='pl-2'>Previous</span>
                                </button>
                                <button onClick={()=>{
                                    headForward()
                                    if(Number(currentQuestion)%5===0 && questionList.length<=50){
                                        fetchNextPage()
                                    }
                                }} title="Next Question"
                                className=" bg-[#7286D3] px-[2%] py-[1%] rounded-md drop-shadow-lg flex justify-center items-center text-white text-thin hover:opacity-80 hover:drop-shadow-2xl">
                                <span className='pr-2'>Next</span>
                                <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        
                            {/* <div className='flex flex-wrap justify-end'>
                                <button onClick={()=>handleSubmit()} title="Sumbit Test"
                                className=" my-[2%] z-90 bg-[#7286D3] px-[3%] py-[1%] rounded-md drop-shadow-lg flex justify-center items-center text-white text-thin hover:opacity-80 hover:scale-95 duration-150">
                                    Submit
                                </button>
                            </div> */}
                        </div>
                        {/* Navigate - Top */}

                        <button onClick={()=>{window.scroll({
                            top: 0, left: 0,  behavior: 'smooth'})
                            }} 
                            title="Navigate Top"
                            className="fixed right-2 bottom-8 z-90 bg-[#8294C4] px-[2%] py-[1%] rounded-md drop-shadow-lg text-white hover:bg-white hover:text-[#000000] duration-150 cursor-pointer">
                                <i class="fa-solid fa-chevron-up"></i>
                        </button>
                
                </div>
                
            </Fragment>
            </div>
           
        </>
    )
}

export default MainDashboard
