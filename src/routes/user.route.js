import { Router } from "express";
import UpdateFcm from "../controllers/fcm.controller.js";
import ValidateUserToken from "../middlewares/validateuser.js";


const router = Router();
router.post('/fcm',ValidateUserToken, UpdateFcm);

export default router