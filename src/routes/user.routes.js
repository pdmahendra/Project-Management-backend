import { Router } from "express";
const router = Router();
import { getAllUsers, loginUser, userRegistration } from '../controllers/user.controller.js'
import  {verifyJwt}  from '../middlewares/auth.middleware.js'

router.route('/register').post(userRegistration)
router.route('/login').post(loginUser)

router.route("/getAllUsers").get(verifyJwt, getAllUsers)

export default router 