import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createEpic, getEpicById, updateEpic } from '../controllers/epic.controller.js'

// router.use(verifyJwt)

router.route('/:siteName/:id/createEpic').post(verifyJwt, createEpic)
router.route('/:siteName/:id/epic/:epicId').get(verifyJwt, getEpicById)
router.route('/:siteName/:id/epic/updateEpic/:epicId').get(verifyJwt, updateEpic)

export default router
