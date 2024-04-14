import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name:"user",
  initialState:{
    user:null,
    otherUsers:null,
    profile:null,
  },
  reducers:{
    getUser:(state,action)=>{
      state.user = action.payload;
    },
    getOtherUsers:(state, action)=>{
      state.otherUsers = action.payload;
    },
    getMyProfile:(state, action)=>{
      state.profile=action.payload
    },
    getFollowing:(state, action)=>{
      if(state.user.following.includes(action.payload)){
        state.user.following = state.user.following.filter((item)=>{
          return item !== action.payload
        })
      }else{
        state.user.following.push(action.payload)
      }
    }
  }
})

export const {getUser, getOtherUsers, getMyProfile, getFollowing} = userSlice.actions;
export default userSlice.reducer;