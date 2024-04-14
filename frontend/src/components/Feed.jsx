import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { LiaImageSolid } from "react-icons/lia";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiWink } from "react-icons/bs";
import PostCart from './PostCart';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {TWEET_API_END_POINT} from '../utils/constant'
import toast from 'react-hot-toast'
import { getRefresh } from '../store/tweetSlice';


const Feed = () => {
  const [post, setPost] = useState("");
  const {tweets} = useSelector(store=>store.tweet)
  const {user} = useSelector(store=>store.user)
  const dispatch =  useDispatch()
  
  const submitHandler = async ()=>{
    try { 
      const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description:post, id:user?._id},{
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(getRefresh());
      }
    } catch (error) {
      console.log(error)
      toast.success(error.response.data.message)
    }
  }

  return (
    <div className='bg-blue-50 w-[50%] overflow-y-scroll no-scrollbar !h-[100vh]'>
      <div className='border-b-[0.2px] border-gray-300 border-t-[0.2px] text-lg font-extrabold bg-white py-2 px-4 '>Home</div>

      <div className='bg-white px-5 pt-3 mb-2 sticky top-0'>
      <Avatar
      className='rounded-full border-[1px] border-black'
       name={user?.name} 
       size="35" />
       <input 
       value={post}
       onChange={(e)=>{setPost(e.target.value)}}
       className='outline-none ml-5 py-1 px-2 w-96'
       placeholder="what's happening"
       type="text" />

      <div className='flex pl-12 justify-between items-center pb-3 pt-3'>
        <div className='flex gap-3 items-center'>
          <LiaImageSolid className='text-blue-500 text-2xl'/>
          <MdOutlineGifBox className='text-blue-500 text-2xl'/>
          <BsEmojiWink className='text-blue-500 text-xl'/>
        </div>
        <div>
          <button onClick={submitHandler} className='bg-blue-500 text-xs font-bold py-1 px-5 rounded-xl text-white'>Post</button>
        </div>
      </div>
      </div>
      
      {
        tweets?.map((item)=>(
          <PostCart key={item._id} des={item} />
        ))
      }
    </div>
  )
}

export default Feed