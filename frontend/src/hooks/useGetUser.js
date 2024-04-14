import axios from 'axios';
import { useState, useEffect } from 'react';
import { USER_API_END_POINT } from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux'
import { getMyProfile } from '../store/userSlice';
const useGetUser = (id) => {
  const dispatch =  useDispatch()
  const {refresh} = useSelector(store=>store.tweet)
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
          withCredentials:true
        });
        
        dispatch(getMyProfile(res.data.user))
      } catch (error) {
        
      }
    };

    fetchData();

  }, [id]); 
};

export default useGetUser;
