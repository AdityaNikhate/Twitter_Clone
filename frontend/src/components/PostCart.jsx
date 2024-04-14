import React from 'react'
import Avatar from 'react-avatar'
import { BiMessageRounded } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {TWEET_API_END_POINT} from '../utils/constant'
import toast from 'react-hot-toast';
import { getRefresh } from '../store/tweetSlice';

function getTimeDifference(databaseTime) {
  
  const databaseDate = new Date(databaseTime);

  const currentTime = Date.now();

  const timeDifference = currentTime - databaseDate.getTime();

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) - (daysDifference * 24);

  return {
    days: daysDifference,
    hours: hoursDifference,
  };
}

const PostCart = ({des}) => {
  const {otherUsers} = useSelector(store=>store.user)
  const {user} = useSelector(store=>store.user);
  const user1 = otherUsers.filter((item)=>(des.userId == item._id));
  const dispatch =  useDispatch()

  const likeOrDislikeHandler = async (id)=>{
    // console.log("hi")
    try {
      const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res?.data?.message)
        dispatch(getRefresh());
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  const time = getTimeDifference(des.createdAt)
  return (
    <div className='bg-white w-full p-2 flex border-b-[0.2px] border-gray-300 border-top-[0.2px]'>
      <div className=' pr-3'>
        <Avatar
        className='rounded-full border-[1px] border-black'
        name={(user1.length == 0)?(user?.name):(user1[0]?.name)}  
        size="35" />
      </div>
      <div className=' px-2'>
        <h1 className='font-bold'>{(user1.length == 0)?(user?.name):(user1[0]?.name)} <span className='text-sm font-medium ml-1 text-gray-500'>{(user1.length == 0)?(user?.username):(user1[0]?.username)}</span> <span className=' font-medium text-sm ml-3 text-gray-500'>
        {(time.days==0)?(`${time.hours} hours`):(`${time.days} days`)}</span></h1>
        <p className='text-sm'>{des.description}</p>
        <div className='flex justify-start gap-32 items-center'>
          <div className='flex gap-1 items-center text-gray-600 cursor-pointer'>
            <BiMessageRounded/>
            <p>0</p>
          </div>
          <div className='flex gap-1 items-center text-gray-600 cursor-pointer'>
            <FaRegHeart onClick={()=>likeOrDislikeHandler(des?._id)}/>
            <p>{des?.like.length}</p>
          </div>
          <div className='flex gap-1 items-center text-gray-600 cursor-pointer'>
            <FaRegBookmark/>
            <p>{des?.bookmarks.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCart