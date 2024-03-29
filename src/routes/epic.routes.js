import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createEpic, getEpics, getEpicById, updateEpic, deleteEpic } from '../controllers/epic.controller.js'

// router.use(verifyJwt)

router.route('/:siteName/:id/createEpic').post(verifyJwt, createEpic)
router.route('/:siteName/:id/getEpics').get(verifyJwt, getEpics)
router.route('/:siteName/:id/getEpic/:epicId').get(verifyJwt, getEpicById)
router.route('/:siteName/:id/updateEpic//:epicId').patch(verifyJwt, updateEpic)
router.route('/:siteName/:id/deleteEpic/:epicId').post(verifyJwt, deleteEpic)

export default router
