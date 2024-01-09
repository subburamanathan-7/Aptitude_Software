import React, { useEffect } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query';


function NewTest() {

    const paginateQuestions = async({pageParam})=>{
        console.log(pageParam?pageParam:1)

        const token = sessionStorage.getItem('user')

        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }

        const res = await axios.get(`http://localhost:5000/api/question/paginatequestions?page=${pageParam}`,config);
        // console.log(res.data)
        return res.data;
    }

    const {data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
        queryKey:['questions'],
        queryFn:paginateQuestions,
        initialPageParam:1,
        getNextPageParam:(lastPage, allPage)=>{
            const nextPage = lastPage.length ? allPage.length+1 : undefined
            return nextPage;
        }
    })

    // console.log(data)
    // console.log(data?.pages)
    // console.log(data?.pages[0].results)


    const content = data?.pages.map(responoses=>responoses?.results.map(question=>{
        return(
            <div className='m-2 p-2 bg-green' key={question.id}>{question.questionString}</div>
        )
    }))


    if(status==='error'){
        return <p>{error.message}</p>
    }
    if(status==='pending'){
        return <p>Pending...</p>
    }
    return (
        <>
        {content}

        <button disabled={!hasNextPage || isFetchingNextPage }
           onClick={()=>fetchNextPage()} >{isFetchingNextPage?'Loading More': hasNextPage?'Load More':'Nothing\'s new' }</button>
        </>


    )
}

export default NewTest