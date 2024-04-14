import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req, res)=>{
  try {
    const {description, id} = req.body;
    if(!description || !id){
      res.status(400).json({
        message:"All fields are require",
        success:false
      })
    }
    await Tweet.create({
      description,
      userId:id
    })

    return res.status(201).json({
      message:"Tweet created successfully",
      success:true
    })
  } catch (error) {
    console.error(error)
  }
}


export const deleteTweet = async (req, res)=>{
  try {
    const {id} = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message:"Tweet deleted successfully",
      success:true
    })
  } catch (error) {
    console.error(error)
  }
}

export const likeOrDislike = async (req, res)=>{
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if(tweet.like.includes(loggedInUserId)){
      await Tweet.findByIdAndUpdate(tweetId, {$pull:{like:loggedInUserId}});
      return res.status(200).json({
        message:"User dislike your tweet",
        success:true
      })
    }else{
      await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}})
      return res.status(200).json({
        message:"User like your tweet",
        success:true
      })
    }

  } catch (error) {
    console.log(error)
  }
}


export const GetAllTweets = async (req, res)=>{
  // loggedInuser tweets and following user tweet
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const loggedInUserTweets = await Tweet.find({userId:id})
    const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
      return Tweet.find({userId:otherUsersId})
    }));
    return res.status(200).json({
      tweets:loggedInUserTweets.concat(...followingUserTweet)
    })
  } catch (error) {
    console.log(`Error from GetAllTweets ${error}`)
  }
}


export const GetFollowingTweets = async (req, res)=>{
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
      return Tweet.find({userId:otherUsersId})
    }));

    return res.status(200).json({
      tweets:[].concat(...followingUserTweet)
    });
  } catch (error) {
    console.log(error)
  }
}