import axios from 'axios';
import {USER_API_END_POINT} from '../utils/constant'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getUser } from '../store/userSlice';



const Login = () => {
  const [login, setLogin] = useState(true)
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate()
  const dispatch = useDispatch()


  const loginfun = async ()=>{

    const data = {
      email:email,
      password:password
    }
    // console.log(data)
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`,{email, password},{
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true
      })
      
      if(res.data.success){
        dispatch(getUser(res?.data?.user))
        toast.success(res.data.message)
        navigation('/home')
      }
    } catch (error) {
      console.log(error.response.data)
      toast.success(error.response.data.message)
    }
  }

  const signupfun = async ()=>{
    const data = {
      name:name,
      username:username,
      email:email,
      password:password
    }
    // console.log(data)
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`,{name,username,email,password},{
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true
      })
      console.log(res)
      if(res.data.success){
        toast.success(res.data.message)
        setLogin(true)
      }
    } catch (error) {
      console.log(error)
      toast.success(error.response.data.message)
    }
  }

  const buttonClick = (e)=>{
    e.preventDefault()
    if(login){
      loginfun()
    }else{
      signupfun()
    }
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center gap-10'>
      <div>
        <img
        className='w-52'
        src="https://img.freepik.com/premium-vector/letter-x-logo-icon-vector-illustration-design_535345-7043.jpg" alt="logo" />
      </div>
      <div>
        <h1 className='text-6xl mb-2 font-bold text-gray-900'>Happening now</h1>
        <h1 className='text-3xl font-bold text-gray-900'>{login?"Login":"SignUp"}</h1>
        <form className=' w-80 p-2 mt-2'>
          {
            !login && (
              <input 
              className='w-full outline-none mb-3 px-4 py-1 border-[1px] border-gray-500 rounded-3xl text-xl'
              placeholder='Name'
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              type="text" />
            )
          }

          {
            !login && (
              <input 
              className='w-full outline-none mb-3 px-4 py-1 border-[1px] border-gray-500 rounded-3xl text-xl'
              placeholder='Username'
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              type="text" />
            )
          }          

          <input 
          className='w-full outline-none mb-3 px-4 py-1 border-[1px] border-gray-500 rounded-3xl text-xl'
          placeholder='Email'
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          type="email" />

          <input 
          className='w-full outline-none mb-3 px-4 py-1 border-[1px] border-gray-500 rounded-3xl text-xl'
          placeholder='Password'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          type="password" />

          <button onClick={buttonClick} className='w-full text-center mb-3 bg-blue-500 font-bold text-white py-1 rounded-3xl'>{login?"Login":"SignUp"}</button>
          <p>{login?"Don't have an account?":"Already have an account"} <span 
          onClick={()=>{setLogin(!login)}}
          className='font-semibold text-blue-600 cursor-pointer'>{login?"Sign Up":"Login"}</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login