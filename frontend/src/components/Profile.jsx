import React from 'react'
import Avatar from 'react-avatar';
import { FaArrowLeftLong } from "react-icons/fa6";
import PostCart from './PostCart';
import useGetUser from '../hooks/useGetUser'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import {USER_API_END_POINT} from '../utils/constant'
import toast from 'react-hot-toast';
import { getRefresh } from '../store/tweetSlice';
import { getFollowing } from '../store/userSlice';

const Profile = () => {
  const {user,profile} = useSelector(store=>store.user)
  const {tweets} = useSelector(store=>store.tweet)
  const following = user?.following;
  const {id} = useParams()
  const isFollowing = following?.filter(item=>item===id);
  const dispatch = useDispatch()


  const handleFollowing = async ()=>{
    // if(isFollowing===0){
      const thisId = user?._id;
      console.log("dsf")
      try {
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`,{userId:thisId},{
          withCredentials:true
        });
        
        if(res.data.success){
          dispatch(getFollowing(id))
          dispatch(getRefresh())
          toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    // }
  }
  
  useGetUser(id);
  return (
    <div className='w-[50%] px-2 overflow-y-scroll no-scrollbar !h-[100vh]'>
      <div className='flex items-center'>
        <FaArrowLeftLong/>
        <div className='pl-7'>
          <h1 className='text-base font-bold'>
          {profile?.name}
          </h1>
          <p className='text-gray-400'>posts</p>
        </div>
      </div>

      <div className='w-full h-44 rounded'>
        <img
        className='w-full h-full rounded'
         src="https://cdna.artstation.com/p/assets/images/images/046/406/754/large/yan-ru-morning1.jpg?1645038475" alt="profile banner" />
      </div>

      <div className='w-full px-3 flex items-center justify-between -mt-[5vh]'>
        <Avatar
          className='rounded-full border-[4px] border-white'
          name={profile?.name} 
          size="120" />

          <button onClick={handleFollowing} className='border-[0.5px] border-gray-400 px-5 py-1 font-extrabold rounded-3xl hover:bg-blue-600 hover:text-white '>{(user?._id==profile?._id)?"Edit Profile":(isFollowing.length==0)?"Follow":"Following"}</button>
      </div>

      <div className='mt-3'>
        <h1 className='text-base font-bold'>
            {profile?.name}
        </h1>
        <p className='text-sm text-gray-400'>{profile?.username}</p>
        <p className='text-sm'>🌎 a male robotic earless cat 🐈 that travels back in time from the 22nd century to aid a preteen boy named Nobita.</p>
      </div>

      <div>
        <h1 className='text-sm font-bold my-4'>{profile?.following.length}<span className='font-semibold text-gray-500 pl-1 pr-5'>following</span>{profile?.followers.length}<span className='font-semibold text-gray-500 pl-1 pr-5'>followers</span></h1>
      </div>

      {
        tweets?.filter((item)=>item?.userId==id).map((item)=>(
          <PostCart key={item._id} des={item} />
        ))
      }
      
    </div>
  )
}

export default Profile