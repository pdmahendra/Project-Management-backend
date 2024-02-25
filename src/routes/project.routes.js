import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createNewProject,getProjectsBySiteName } from '../controllers/project.controller.js'

router.use(verifyJwt)

router.route('/:siteName/createNewProject').post( createNewProject)
router.route('/:siteName/getAllProject').get( getProjectsBySiteName)

export default router;