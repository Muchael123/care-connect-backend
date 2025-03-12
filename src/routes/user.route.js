import { Router } from "express";
import UpdateFcm from "../controllers/fcm.controller.js";
import ValidateUserToken from "../middlewares/validateuser.js";
import UpdaterUserLocation from "../controllers/location.controller.js";
import ValidateLocation from "../middlewares/bot/validatelocation.js";

const router = Router();
router.post('/fcm',ValidateUserToken, UpdateFcm);
router.patch('/location',ValidateUserToken,ValidateLocation, UpdaterUserLocation);
// router.patch('/update', ValidateUserToken, updateUserDetails);

export default router