import { Router } from "express";
const router = Router();
import { loginUser, userRegistration, updatePassword } from '../controllers/user.controller.js'
import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route('/register').post(userRegistration)
router.route('/login').post(loginUser)
// router.route('/updateUser/:userId').put(updateUser)
router.route('/updatePassword').put(verifyJwt,updatePassword)

// router.route("/getAllUsers").get(verifyJwt, getAllUsers)//only for jwt token testing purpose

export default router 