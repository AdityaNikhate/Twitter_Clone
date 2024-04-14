import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import useGetUser from '../hooks/useGetUser'
import {useSelector} from 'react-redux'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import useGetTweets from '../hooks/useGetTweets'
const Home = () => {
  const {user, otherUsers} = useSelector(store=>store.user);
  const navigation = useNavigate();
  useEffect(()=>{
    if(!user){
      navigation('/login')
    }
  },[])
  useGetTweets(user?._id); 
  useGetOtherUsers(user?._id)
  return (
    <div className='flex justify-between mx-40'>
      <LeftSidebar/>
      <Outlet/>
      <RightSidebar otherUsers={otherUsers}/>
    </div>
  )
}

export default Home