import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createNewProject,getAllYourOrgProjectsBySiteName } from '../controllers/project.controller.js'

router.use(verifyJwt)

router.route('/:siteName/createNewProject').post( createNewProject)
router.route('/:siteName/getAllProject').get( getAllYourOrgProjectsBySiteName)

export default router;