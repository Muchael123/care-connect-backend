import { Router } from "express";
import validateRegDetails from "../middlewares/validatereg.js";
import  ValidateLogDetails from "../middlewares/validatelogin.js"
import RegisterUser from "../controllers/reg.controller.js";
import HashPassword from "../middlewares/hashpass.js";
import Login from "../controllers/login.controller.js";
import validateToken from "../controllers/validate-token.js";
import resendOTP from "../controllers/resotp.controller.js"

const router = Router();

router.post('/register', validateRegDetails, HashPassword, RegisterUser);

router.post("/login",  ValidateLogDetails, Login);
router.post("/validate-code", validateToken);
router.post("/req-otp", resendOTP);

export default router