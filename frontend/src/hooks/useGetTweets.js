import axios from 'axios';
import { useState, useEffect } from 'react';
import { TWEET_API_END_POINT } from '../utils/constant';
import {useDispatch,useSelector} from 'react-redux'
import { getAlltweets } from '../store/tweetSlice';

const useGetTweets = (id) => {
  const dispatch =  useDispatch()
  const {refresh} = useSelector(store=>store.tweet)
  
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${TWEET_API_END_POINT}/getalltweets/${id}`,{
          withCredentials:true
        });
        
        dispatch(getAlltweets(res.data.tweets))
      } catch (error) {
        
      }
    };

    fetchOtherUsers();

  }, [refresh]); 
};

export default useGetTweets;
