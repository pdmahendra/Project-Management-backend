import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createProject } from '../controllers/project.controller.js'

router.route('/create').post(verifyJwt,createProject)

export default router
