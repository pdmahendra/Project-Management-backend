import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createOrganization } from '../controllers/orgnization.controller.js'

router.route('/createInstance').post(verifyJwt, createOrganization)

export default router