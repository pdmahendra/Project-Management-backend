import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createEpic } from '../controllers/epic.controller.js'

// router.use(verifyJwt)


// import { createEpic } from "../controllers/epic.controller.js";
router.route('/:siteName/:id/createEpic').post(verifyJwt,createEpic)
export default router
