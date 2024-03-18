import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createEpic, getEpicById } from '../controllers/epic.controller.js'

// router.use(verifyJwt)


// import { createEpic } from "../controllers/epic.controller.js";
router.route('/:siteName/:id/createEpic').post(verifyJwt, createEpic)
router.route('/:siteName/:id/epic/:epicId').get(verifyJwt, getEpicById)
export default router
