import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useQuery, QueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom"

import { DashNavbar } from '../components/DashNavbar'
import {Modal} from '../components/Modal'
import { Card } from '../components/Card';
import { CountCard } from '../components/CountCard';

import {listQuestions} from '../features/responses/ResponseServices'
import { submitTest } from '../features/responses/ResponseServices';

function MainDashboard() {
    let content="", questionList;
    let timeremaining=0
    const navigate = useNavigate();
    const Ref = useRef()

    const [showModal,setShowModal] = useState(false)
    const [currentQuestion,setCurrentQuestion] = useState(0)

    // const [responses,setResponses]= useState([{
    //     key:null,
    //     answer:null,
    // }])
    
    const [selectedIndexes, setSelectedIndexes] = useState(Array(4).fill(""));

    const [selectedOptions, setSelectedOptions] = useState(Array(4));
    
    // selectedOptions[0] = new Object()
    // selectedOptions[0].questionID = '1';
    // selectedOptions[0].answerString = 'ans';

    const [attemptedCount, setAttemptedCount] = useState(0);

	const [timer, setTimer] = useState("00:00:00");

    const submitMutation = useMutation({
        mutationFn:submitTest,
        onSuccess:(data)=>{
            console.log(data)
            navigate('/feedback')
        },
        onError:(message)=>{
            console.log(message)
        }
    })

    const headPrevious =()=>{
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'});
        
        if(currentQuestion>0)
            setCurrentQuestion(prev => prev-1)
    }

    const headForward =()=>{
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'});
        
        if(currentQuestion<questionList.length-1)
            setCurrentQuestion(prev => prev+1)
    }

    const handleSection = (section)=>{
        let  searchIndex = questionList.findIndex((question) => question.questionCategory===section);
        setCurrentQuestion(searchIndex)
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

    const onSubmit =()=>{
        setShowModal(true)
    }
    const handleSubmit =()=>{


        let total=0;
        const hours = Number(timer[1]);
        const minutes = Number(timer[3]+timer[4]);
        const seconds = Number(timer[6]+timer[7]);

        total=total+ (hours*3600);
        total=total+ (minutes*60);
        total = total+seconds;

        // console.log(total)

        submitMutation.mutate({
            selectedOptions:selectedOptions,
            timeTaken:60-total,
            token:sessionStorage.getItem('user')
        })

    }
    const listQuestionSet = useQuery({
        queryKey:['questions'],
        queryFn:()=>{
            return listQuestions(sessionStorage.getItem('user')) 
        },
    })

    if(listQuestionSet.isLoading){
    }
    else if(listQuestionSet.isFetched ){
        // console.log("Questions Fetched")
        content = listQuestionSet.data
        questionList = content
    }

    // const getTimeRemaining = (e) => {

	// 	const total =
	// 		Date.parse(e) - Date.parse(new Date());
	// 	const seconds = Math.floor((total / 1000) % 60);
	// 	const minutes = Math.floor(
	// 		(total / 1000 / 60) % 60
	// 	);
	// 	const hours = Math.floor(
	// 		(total / 1000 / 60 / 60) % 24
	// 	);
	// 	return {
	// 		total,
	// 		hours,
	// 		minutes,
	// 		seconds,
	// 	};
	// };

    // const startTimer = (e) => {
	// 	let { total, hours, minutes, seconds } =
	// 		getTimeRemaining(e);
	// 	if (total > 0) {
	// 		// update the timer
	// 		// check if less than 10 then we need to
	// 		// add '0' at the beginning of the variable
	// 		setTimer(
	// 			(hours > 9 ? hours : "0" + hours) +
	// 				":" +
	// 				(minutes > 9
	// 					? minutes
	// 					: "0" + minutes) +
	// 				":" +
	// 				(seconds > 9 ? seconds : "0" + seconds)
	// 		);
	// 	}
    //     if(total===0){
    //        handleSubmit();
    //     }
        
	// };

	// const clearTimer = (e) => {
	// 	// If you adjust it you should also need to
	// 	// adjust the Endtime formula we are about
	// 	// to code next
	// 	setTimer("00:00:60");

	// 	// If you try to remove this line the
	// 	// updating of timer Variable will be
	// 	// after 1000ms or 1sec
	// 	if (Ref.current) clearInterval(Ref.current);
	// 	const id = setInterval(() => {
	// 		startTimer(e);

	// 	}, 1000);
	// 	Ref.current = id;
	// };
	// const getDeadTime = () => {
	// 	let deadline = new Date();

	// 	// This is where you need to adjust if
	// 	// you entend to add more time
	// 	deadline.setSeconds(deadline.getSeconds() + 60);
	// 	return deadline;
	// };
	// useEffect(() => {
	// 	clearTimer(getDeadTime());
	// }, []);

    return(
        <>
            <div className='fixed top-0 left-0 right-0'>
                <DashNavbar handleSubmit={handleSubmit} onSubmit={onSubmit}/>
            </div>

            <Fragment>
                <div className={`relative top-10 p-[2%] bg-opacity-60 min-h-screen`}>

                    {/* <div className='flex'>
                        <div className=''>
                            <h1 className='font-semibold text-3xl text-center text-[#000000] cursor-default'>Sections</h1>
                            <div className='flex'>
                                <Card name={"Verbal"} onClick={()=>handleSection('verbal')}/>
                                <Card name={"Aptitude"} onClick={()=>handleSection('aptitude')}/>
                                <Card name={"Core"} onClick={()=>handleSection('core')}/>
                                <Card name={"Coding"} onClick={()=>handleSection('coding')}/>
                            </div>
                        </div>
                        <div className=''>
                           \
                            <h1 className='font-semibold text-3xl text-center text-[#000000] cursor-default'>Status</h1>

                            <div className='flex'>
                                <CountCard name={"Attempted"} count={attemptedCount}  />
                                <CountCard name={"Not Attemped"} count={4-Number(attemptedCount)} />
                            </div>
                        </div>
                    </div> */}

                    {/* Pull Sidebar */}
                    <button 
                        onClick={()=>{
                            window.scroll({
                            top: 0, 
                            left: 0, 
                            behavior: 'smooth'});
                        }} title="Navigate Top"
                        className="fixed right-2 top-20 z-90 bg-[#8294C4] px-[2%] py-[1%] rounded-md drop-shadow-lg text-white hover:bg-white hover:text-[#000000] duration-150 cursor-pointer">
                        <i class="fa-solid fa-angles-left"></i>
                    </button>
                
                    {/* Questions  */}
                        
                    {
                        questionList?
                        (
                        <div className='flex rounded-lg w-[90%] justify-center items-center my-[2%] mx-[5%]'>
                        <div className='p-[2%] rounded-lg shadow-xl w-full max-w-screen text-center'>
                        
                            <div className=' text-xl font-semibold my-[2%]'>
                                <div className=' flex flex-row'>
                                    <span>Q {currentQuestion + 1}:</span>
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
                            className=" z-90 bg-[#7286D3] px-[2%] py-[1%] rounded-md drop-shadow-lg flex justify-center items-center text-white text-thin hover:opacity-80 hover:drop-shadow-2xl">
                                <i className="fa-solid fa-arrow-left"></i>
                                <span className='pl-2'>Previous</span>
                            </button>
                            <button onClick={()=>headForward()} title="Next Question"
                            className=" z-90 bg-[#7286D3] px-[2%] py-[1%] rounded-md drop-shadow-lg flex justify-center items-center text-white text-thin hover:opacity-80 hover:drop-shadow-2xl">
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
                        <button onClick={()=>{window.scroll({
                                                top: 0, 
                                                left: 0, 
                                                behavior: 'smooth'});
                                            }} title="Navigate Top"
                            className="fixed left-2 bottom-8 z-90 bg-[#8294C4] px-[2%] py-[1%] rounded-md drop-shadow-lg text-white hover:bg-white hover:text-[#000000] duration-150 cursor-pointer">
                                <i class="fa-solid fa-chevron-up"></i>
                        </button>

                </div>

                <Modal isVisible={showModal} onClose={()=>{setShowModal(false)}}>
                    <div className="relative overflow-x-auto py-[2%] ">
                        <span className = "text-lg font-semibold px-[2%]">Do you wish to exit the Test?</span>
                        <br/>
                        <br/>
                        <div className='flex items-center justify-center my-[4%] text-white'>
                            <button className=' px-[2%] cursor-pointer bg-[#D22B2B] focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                            type='submit' id='cancel' onClick={()=>{}}>
                                Cancel
                            </button>
                            <button className=' px-[2%] cursor-pointer bg-[#8EA7E9] focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                            type='submit' id='submit' onClick={handleSubmit}>
                                Submit Test
                            </button>
                        </div>
                    </div>
                </Modal>

            </Fragment>
           
        </>
    )
}

export default MainDashboard
