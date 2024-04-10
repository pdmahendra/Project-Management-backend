import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createStory } from '../controllers/story.controller.js'

// router.use(verifyJwt)

router.route('/:siteName/:id/:epicId/createStory').post(verifyJwt, createStory)

export default router
