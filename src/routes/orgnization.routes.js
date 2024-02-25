import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createOrganization,getOrgnizaitonBySiteLink } from '../controllers/orgnization.controller.js'

router.route('/createInstance').post(verifyJwt, createOrganization)
router.route('/:siteName/getsingleOrg').get(verifyJwt, getOrgnizaitonBySiteLink)
// router.route('/:siteName/getsingleOrg').get(getOrgnizaitonBySiteLink);



export default router