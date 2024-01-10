import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

import {toast} from 'react-toastify';

function Test() {

    const fetchTodos = async({pageParam})=>{
        console.log(pageParam?pageParam:1)
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`); 
        // const data = await res.json();
        // console.log(data)
        return res.json();
    }
    const {data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
        queryKey:['todos'],
        queryFn:fetchTodos,
        initialPageParam:1,
        getNextPageParam:(lastPage, allPage)=>{
            const nextPage = lastPage.length ? allPage.length+1 : undefined
            console.log({lastPage,allPage})
            return nextPage;
        }

    })
    // console.log(data)
    // console.log(data?data.pages:null)
    // console.log(data?data.pages[0][0]:null)

    const content = data?.pages.map(todos=>todos.map(todo=>{
        return(
            <div className='m-2 p-2 bg-green' key={todo.title}>{todo.title}</div>
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

export default Test