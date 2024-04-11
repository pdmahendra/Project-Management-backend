import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createStory, getStoryById } from '../controllers/story.controller.js'

// router.use(verifyJwt)

router.route('/:siteName/:id/:epicId/createStory').post(verifyJwt, createStory)
router.route('/:siteName/:id/:epicId/getStory/:storyId').get(verifyJwt, getStoryById)

export default router
