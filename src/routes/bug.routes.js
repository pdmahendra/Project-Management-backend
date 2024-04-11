import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createBug } from "../controllers/bug.controller.js";


router.route('/:siteName/:id/:epicId/:storyId/createBug').post(verifyJwt, createBug)

export default router