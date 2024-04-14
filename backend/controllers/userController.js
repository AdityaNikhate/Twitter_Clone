import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

dotenv.config({
  path:'../controllers/.env'
})
export const Register = async (req, res)=>{
  try {
    const {name, username, email, password} = req.body;

    // check if any field is empty or not
    if(!name|| !username|| !email || !password){
      return res.status(401).json({
        message:"All fields are required",
        success:false
      })
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({
        message:"User already exist",
        success: false
      })
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
      name, 
      username, 
      email,
      password: hashedPassword
    })
    
    return res.status(201).json({
      message:`Welcome ${name} please login to enter`,
      success:true
    })

  } catch (error) {
    console.error(`Problem in Register ${error}`)
    return res.status(500).json({
      message:"Failed to Register Error occure",
      success: false
    })
  }
}

export const Login = async (req, res)=>{
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        message:"All fields are required",
        success:false
      })
    }

    const exist = await User.findOne({email});
    if(!exist){
      return res.status(400).json({
        message:"User dont exist",
        success: false
      })
    }

    
    const passCheck = await bcryptjs.compare(password, exist.password);
    if(!passCheck){
      return res.status(400).json({
        message:"Enter correct password",
        success:false
      })
    }

    // Generate the token 
    const tokenDate = {
      userId: exist._id
    }
    const token = await jwt.sign(tokenDate, process.env.TOKEN_SECRET, {expiresIn:'1d'})
    return res.status(200).cookie("token",token,{expiresIn:'1d', httpOnly:true}).json({
      message:`Welcome back ${exist.name}`,
      user:exist,
      success:true
    })
  } catch (error) {
    console.log(`You had error in Login ${error}`)
    return res.status(500).json({
      message:"Failed to SignIn.",
      success:true
    })
  }
}


export const Logout = (req, res)=>{
  return res.cookie("token","", {expiresIn:new Date(Date.now())}).json({
    message:"Logout successfully.",
    success:true
  });
}


export const Bookmark = async (req, res)=>{
  try{
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const user  = await User.findById(loggedInUserId)
    if(user.bookmark.includes(tweetId)){
      await User.findByIdAndUpdate(loggedInUserId, {$pull:{bookmark:tweetId}})
      return res.status(200).json({
        message:"Removed from Bookmark",
        success:true
      })
    }else{
      await User.findByIdAndUpdate(loggedInUserId, {$push:{bookmark:tweetId}})
      return res.status(200).json({
        message:"Added to Bookmark",
        success:true
      })
    }
  }catch(error){
    console.log(`Error from bookmark controller ${error}`)
  }
}


export const GetMyProfile = async (req, res)=>{
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      user
    })
  } catch (error) {
    console.log(`Error from getmyprofile ${error}`)
  }
}


export const GetOtherUsers = async (req, res)=>{
  try {
    const {id} = req.params;
    const otherUser = await User.find({_id:{$ne:id}}).select("-password");
    if(otherUser){
      return res.status(200).json({otherUser})
    }
    return res.status(200).json({
      message: "Users Dont Exists",
      success: true
    })
  } catch (error) {
    console.log(`Error in GetOtherUsers ${error}`)
  }
}


// export const Follow = async (req,res)=>{
//   try {
//     const loggedInUser = req.body.id;
//     const toFollow = req.params.id;
//     const user1 = await User.findById(loggedInUser);
//     const user2 = await User.findById(toFollow);

//     if(user1.following.includes(toFollow)){
//       await User.findByIdAndUpdate(loggedInUser, {$pull:{following:toFollow}})
//       await User.findByIdAndUpdate(toFollow, {$pull:{followers:loggedInUser}});
//       return res.status(200).json({
//         message:`You Unfollowed ${user2.name}`,
//         success:true
//       })
//     }
//     else{
//       await User.findByIdAndUpdate(loggedInUser, {$push:{following:toFollow}})
//       await User.findByIdAndUpdate(toFollow, {$push:{followers:loggedInUser}})
//       return res.status(200).json({
//         message:`You followed ${user2.name}`,
//         success:true
//       })
//     }

      
//   } catch (error) {
//     console.log(`Your have error in Follow ${error}`)
//   }
// }

export const Follow = async (req, res) => {
  try {
    const loggedInUser = req.body.userId;
    const toFollow = req.params.id;

    const user1 = await User.findById(loggedInUser);
    const user2 = await User.findById(toFollow);
    
    if (!user1 || !user2) {
      return res.status(404).json({
        message: `User not found ${user1} ******* ${user2}`,
        success: false
      });
    }

    if (user1.following.includes(toFollow)) {
      await User.findByIdAndUpdate(loggedInUser, { $pull: { following: toFollow } });
      await User.findByIdAndUpdate(toFollow, { $pull: { followers: loggedInUser } });
      return res.status(200).json({
        message: `You Unfollowed ${user2.name}`,
        success: true
      });
    } else {
      await User.findByIdAndUpdate(loggedInUser, { $push: { following: toFollow } });
      await User.findByIdAndUpdate(toFollow, { $push: { followers: loggedInUser } });
      return res.status(200).json({
        message: `You followed ${user2.name}`,
        success: true
      });
    }
  } catch (error) {
    console.error(`Error in Follow: ${error}`);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};


export const getFollowing = async (req,res)=>{
  const id = req.body.id;
  try {
    const user = await User.findById(id);
    return res.status(200).json({
      message: user.following,
      following:user.following,
      success:true
    })
  } catch (error) {
    console.log(error)
  }
  
}