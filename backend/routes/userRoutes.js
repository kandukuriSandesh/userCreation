import express from "express";
import { userAuthHandler,registerUser,logoutUser,getUserProfile,updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router  = express.Router();

router.get('/auth',userAuthHandler);
router.post('/',registerUser);
router.get('/logout',logoutUser);
router.route('/profile').get(protect, getUserProfile).post(protect,updateUserProfile);


export default router;