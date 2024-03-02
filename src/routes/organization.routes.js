import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createOrganization,getYourOrganization } from '../controllers/orgnization.controller.js'

router.route('/createInstance').post(verifyJwt, createOrganization)
router.route('/getOrganization').get(verifyJwt, getYourOrganization)
// router.route('/:siteName/getsingleOrg').get(getOrgnizaitonBySiteLink);



export default router