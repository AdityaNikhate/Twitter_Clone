import React, { useEffect, useState } from 'react'
import axios from 'axios';
const AI = () => {
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("it was great session lot to learn from you. is it gramatically correct rewrite it");
  const apiKey = "Api__key"
  const fetchData = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/gemini', { text }, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      });
      setAnswer(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(text);
  }, [text]);  
  return (
    <div className='w-full '>
      <div className='mt-20 m-10 '>
        <h1 className='text-xl font-bold uppercase text-center'>AI BOT in service</h1>
        <textarea onChange={(e)=>(setText(e.target.value))} value={text} rows={3} placeholder='write the content of the post.....' className='w-full bg-blue-100 mt-5 p-2 rounded border-2 border-gray-500'></textarea>
      </div>
    </div>
  )
}

export default AI