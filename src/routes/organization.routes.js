import { Router } from "express";
const router = Router();
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createOrganization,getYourOrganizationById } from '../controllers/orgnization.controller.js'

router.route('/createInstance').post(verifyJwt, createOrganization)
router.route('/getOrganization/:id').get(verifyJwt, getYourOrganizationById)
// router.route('/:siteName/getsingleOrg').get(getOrgnizaitonBySiteLink);



export default router