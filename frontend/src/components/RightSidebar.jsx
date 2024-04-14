import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import UserCart from './UserCart';

const RightSidebar = ({otherUsers}) => {
  return (
    <div className='w-[25%] px-2  overflow-y-scroll no-scrollbar !h-[70vh]'>
      <div className='bg-white sticky top-0 h-32 pt-12'>
      <div className='bg-gray-200 w-full px-4 p-2 flex items-center rounded-3xl '>
        <IoSearchOutline/>
        <input className='w-full ml-2 py-1 px-2 outline-none bg-transparent text-sm' placeholder='search'  type="text" />
      </div>
      </div>
      <div className='border-b-[0.2px] border-gray-300 border-t-[0.2px] text-lg mt-10 font-extrabold bg-white py-2 px-4 '>Who to follow</div>
      
      {
        otherUsers?.map((item,index)=>(
          
          <UserCart key={item._id} user={item}/>
        ))
      }
    </div>
  )
}

export default RightSidebar