import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaHashtag } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { IoAtCircleOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import {USER_API_END_POINT} from '../utils/constant'
import {useDispatch, useSelector} from 'react-redux'
import { getMyProfile, getOtherUsers, getUser } from '../store/userSlice';
import { getAlltweets } from '../store/tweetSlice';

const LeftSidebar = () => {
  const {user} = useSelector(store=>store.user)
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const logoutbut = async ()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`)
    if(res.data.success){
      dispatch(getUser(null))
      dispatch(getOtherUsers(null))
      dispatch(getMyProfile(null))
      dispatch(getAlltweets(null))
      toast.success(res.data.message)
      navigation('/login')
    } 
    } catch (error) {
      // navigation('/login')
    }
  }
  
  return (
    <div className='w-[25%] pl-10 pr-6 h-[100vh] border-r-[0.4px] border-gray-300'>
      <div>
        <img className='w-20 ' src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710720000&semt=ais" alt="logo" />
      </div>
      <Link to={'/home'}>
        <div className='flex items-center py-2 w-full mt-3 pl-10 gap-3 hover:bg-gray-300 rounded-md'>
          <GoHomeFill className='text-xl'/>
          <h1 className='text-xl font-bold'>Home</h1>
        </div>
      </Link>
      
      <div className='flex items-center py-2 w-full mt-3 pl-10 gap-3 hover:bg-gray-300 rounded-md'>
        <FaHashtag className='text-xl'/>
        <h1 className='text-xl font-bold'>Explore</h1>
      </div>

      <div className='flex items-center py-2 w-full mt-3 pl-10 gap-3 hover:bg-gray-300 rounded-md'>
        <IoNotificationsOutline className='text-xl'/>
        <h1 className='text-xl font-bold'>Notification</h1>
      </div>

      <div className='flex items-center py-2 w-full mt-3 pl-10 gap-3 hover:bg-gray-300 rounded-md'>
        <MdOutlineMailOutline className='text-xl'/>
        <h1 className='text-xl font-bold'>Messages</h1>
      </div>

      <div className='flex items-center py-2 w-full mt-3 pl-10 gap-3 hover:bg-gray-300 rounded-md'>
        <FaRegBookmark className='text-xl'/>
        <h1 className='text-xl font-bold'>Bookmarks</h1>
      </div>

      <Link to={`/home/profile/${user?._id}`}>
        <div className='flex items-center py-2 w-full mt-3 pl-10 gap-3 hover:bg-gray-300 rounded-md'>
          <IoAtCircleOutline className='text-xl'/>
          <h1 className='text-xl font-bold'>Profile</h1>
        </div>
      </Link>

      <div onClick={logoutbut} className='flex items-center py-2 w-full mt-3 pl-10 gap-3 hover:bg-gray-300 rounded-md'>
        <TbLogout2 className='text-xl'/>
        <h1 className='text-xl font-bold'>Logout</h1>
      </div>

      <div>
        <button className='w-full py-2 text-center mt-4 rounded-full text-xl font-bold text-white bg-[#1EA1F2]'>Tweet</button>
      </div>
    </div>
  )
}

export default LeftSidebar