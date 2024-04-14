import express from 'express'
import { GetAllTweets, GetFollowingTweets, createTweet, deleteTweet, likeOrDislike } from '../controllers/tweetController.js'
import { isAuthenticated } from '../config/auth.js'

const router = express.Router()

router.route('/create').post(isAuthenticated,createTweet)
router.route('/delete/:id').delete(isAuthenticated,deleteTweet)
router.route('/like/:id').put(isAuthenticated,likeOrDislike)
router.route('/getalltweets/:id').get(isAuthenticated,GetAllTweets)
router.route('/followingtweet/:id').get(isAuthenticated,GetFollowingTweets)


export default router