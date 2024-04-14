import React from 'react'
import Avatar from 'react-avatar'
import {Link} from 'react-router-dom'

const UserCart = ({user}) => {
  return (
    <div className='w-full flex justify-between mt-2'>
      <div className='flex items-center'>
        <div className='pr-3 pt-1'>
          <Avatar
            className='rounded-full border-[1px] border-black bg-center'
            name={user.name} 
            size="35" />
        </div>
        <div>
          <h1 className='text-base font-bold'>{user.name}</h1>
          <p className='text-sm text-gray-500'>{user.username}</p>
        </div>
      </div>

      <div>
      <Link to={`profile/${user._id}`}>
        <button className=' float-right px-4 bg-gray-900 rounded-3xl mt-4  text-white font-bold'>Profile</button>
      </Link>
      </div>
    </div>
  )
}

export default UserCart