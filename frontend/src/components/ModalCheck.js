import React from 'react'

function ModalCheck({firstText,secondText,onClick}) {

    const handleClick = ()=>{
        onClick()

      }

  return (
   <>
        <div className="relative overflow-x-auto py-[2%] ">
            <span className = "text-lg font-semibold px-[2%]">{firstText}</span>
            <br/>
            <br/>
            <div className='flex items-center justify-center my-[4%] text-white'>
                <button className=' px-[2%] cursor-pointer bg-[#D22B2B] focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                type='submit' id='cancel' onClick={()=>{}}>
                    Cancel
                </button>
                <button className=' px-[2%] cursor-pointer bg-[#8EA7E9] focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                type='submit' id='submit' onClick={handleClick}>
                    {secondText}
                </button>
            </div>
        </div>
   </>
  )
}

export default ModalCheck