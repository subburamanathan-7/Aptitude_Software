import React from 'react'

export function CountCard({name,count,onClick}) {

  const handleClick = ()=>{
    onClick()
  }
  return (
    <>
        
        <button type="button" onClick={handleClick} className=" m-[2%] inline-flex justify-between items-center px-5 py-2.5 text-md font-medium text-center text-white bg-[#7286D3] w-full rounded-lg  focus:ring-4 focus:outline-none  overflow-hidden sm:w-52 hover:scale-95 duration-150">
            {name}
            <span className=" text-[#000] inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-white rounded-full">
            {count}
            </span>
        </button>
    </>
  )
}