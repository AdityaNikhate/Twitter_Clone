import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({
  path:'../.env'
})
const databaseConnection = async ()=>{
  try {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
      console.log("Database Connected")
    })
    .catch(e=>{
      console.error(e);
    })
  } catch (error) {
    console.error(`error occure to connect the database : ${error}`)
  }
}

export default databaseConnection