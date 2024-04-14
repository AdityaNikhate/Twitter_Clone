import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
  },
  username:{
    type:String,
    require:true,
    unique:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  bookmark:{
    type:Array,
    default:[]
  },
  followers:{
    type:Array,
    default:[]
  },
  following:{
    type:Array,
    default:[]
  }
},{timestamps:true})

export const User = mongoose.model("User", userSchema);