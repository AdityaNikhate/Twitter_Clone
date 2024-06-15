import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import Feed from './Feed'
import Profile from './Profile'
import Login from './Login'
import AI from './AI'

const Body = () => {
  const route = createBrowserRouter([
    {
      path:'/home',
      element:<Home/>,
      children:[
        {
          path:'',
          element:<Feed/>
        },{
          path:'profile/:id',
          element:<Profile/>
        },{
          path: 'aibot',
          element:<AI/>
        }
      ]
    },{
      path:'/login',
      element:<Login/>
    }
  ])

  return (
    <div>
      <RouterProvider router={route} />
    </div>
  )
}

export default Body