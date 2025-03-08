import { Router } from "express";
import chatBot from "../controllers/bot.controller.js";
import ValidateUserToken from "../middlewares/validateuser.js";

const router = Router();

router.post('/patient',ValidateUserToken, chatBot);

export default router;