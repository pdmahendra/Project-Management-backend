import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createOrganization,getYourOrgnization } from '../controllers/orgnization.controller.js'

router.route('/createInstance').post(verifyJwt, createOrganization)
router.route('/getOrgnization').get(verifyJwt, getYourOrgnization)
// router.route('/:siteName/getsingleOrg').get(getOrgnizaitonBySiteLink);



export default router