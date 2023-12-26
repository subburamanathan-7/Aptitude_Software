import React from 'react'

export function Card({name,onClick}) {

  const handleClick = ()=>{
    onClick()
  }
  return (
    <>
        <div className='flex flex-col text-[#000000] bg-[#7286D3] rounded-lg shadow-md w-full m-[2%] overflow-hidden sm:w-52 hover:scale-95 duration-150'>
            <button className='text-sm text-white p-[8%] text-center' onClick={handleClick}>{name}</button>
        </div>
    </>
  )
}