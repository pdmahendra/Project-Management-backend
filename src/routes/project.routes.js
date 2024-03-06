import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import {
     createNewProject,
     getAllYourOrgProjectsBySiteName,
      getSingleProject,
       updateProject,
       deleteProject
     } from '../controllers/project.controller.js'

router.use(verifyJwt)

router.route('/:siteName/projects/createNewProject').post(createNewProject)
router.route('/:siteName/projects/getAllProject').get(getAllYourOrgProjectsBySiteName)
router.route('/:siteName/projects/getSingleProject/:id').get(getSingleProject)
router.route('/:siteName/projects/updateProject/:id').patch(updateProject)
router.route('/:siteName/projects/deleteProject/:id').post(deleteProject)

export default router;