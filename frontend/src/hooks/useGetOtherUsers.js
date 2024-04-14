import axios from 'axios';
import { useState, useEffect } from 'react';
import { USER_API_END_POINT } from '../utils/constant';
import {useDispatch} from 'react-redux'
import { getMyProfile, getOtherUsers } from '../store/userSlice';
const useGetOtherUsers = (id) => {
  const dispatch =  useDispatch()
  
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        console.log(id)
        const res = await axios.get(`${USER_API_END_POINT}/otherusers/${id}`,{
          withCredentials:true
        });
        console.log(res)
        dispatch(getOtherUsers(res.data.otherUser))
      } catch (error) {
        
      }
    };

    fetchOtherUsers();

  }, []); 
};

export default useGetOtherUsers;
