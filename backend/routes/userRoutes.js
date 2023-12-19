import express from "express";
import { userAuthHandler,registerUser,logoutUser,getUserProfile,updateUserProfile } from "../controllers/userController.js";

const router  = express.Router();

router.get('/auth',userAuthHandler);
router.post('/',registerUser);
router.get('/logout',logoutUser);
router.route('/profile').get(getUserProfile).post(updateUserProfile);


export default router;