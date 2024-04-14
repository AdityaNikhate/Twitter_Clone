import express from "express"
import dotenv from "dotenv"
import databaseConnection from "./config/database.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoute from './routes/userRoute.js'
import tweetRoute from './routes/tweetRoute.js'

dotenv.config({
  path:'.env'
})
const app = express()
const corsOption = {
  origin:["http://localhost:3000"],
  credentials:true
}
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/tweet', tweetRoute)
const port = process.env.PORT || 8080;         
databaseConnection()

app.listen(port, ()=>{
  console.log(`server listening at ${port}`)
})   