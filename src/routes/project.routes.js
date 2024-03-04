import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createNewProject, getAllYourOrgProjectsBySiteName, getSingleProject } from '../controllers/project.controller.js'

router.use(verifyJwt)

router.route('/:siteName/projects/createNewProject').post(createNewProject)
router.route('/:siteName/projects/getAllProject').get(getAllYourOrgProjectsBySiteName)
router.route('/:siteName/projects/getSingleProject/:id').get(getSingleProject)

export default router;