import React from 'react'

export function CountCard({name,count,onClick}) {

  const handleClick = ()=>{
    onClick()
  }
  return (
    <>
        
        <button type="button" className=" cursor-default m-[2%] inline-flex justify-between items-center px-5 py-2.5 text-md font-medium text-center text-white bg-[#7286D3] w-full rounded-lg   overflow-hidden sm:w-52 hover:scale-95 duration-150">
            {name}
            <span className="text-[#000] inline-flex items-center justify-center w-7 h-4 ms-2 text-xs font-semibold  bg-white rounded-full">
            {count}
            </span>
        </button>
    </>
  )
}