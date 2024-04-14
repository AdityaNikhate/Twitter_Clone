import express from "express"
import { Login, Logout, Register, Bookmark, GetMyProfile, GetOtherUsers, Follow, getFollowing } from "../controllers/userController.js";
import { isAuthenticated } from "../config/auth.js";


const router = express.Router();

router.route("/register").post(Register);    
router.route("/login").post(Login)
router.route('/logout').get(Logout)
router.route('/bookmark/:id').put(isAuthenticated,Bookmark)
router.route('/profile/:id').get(isAuthenticated,GetMyProfile)    
router.route('/otherusers/:id').get(isAuthenticated, GetOtherUsers)
router.route('/follow/:id').post(isAuthenticated,Follow)  
router.route('/getfollowing').post(getFollowing)
export default router