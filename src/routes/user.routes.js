import { Router } from "express";
const router = Router();
import {
    loginUser,
    userRegistration,
    updateUserPassword,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js'
import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route('/register').post(userRegistration)
router.route('/login').post(loginUser)
//jwt verify
router.route('/updatePassword').put(verifyJwt, updateUserPassword)
router.route('/updateUser').patch(verifyJwt, updateUser)
router.route('/deleteUser').post(verifyJwt, deleteUser)



export default router 