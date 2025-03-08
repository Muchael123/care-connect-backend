import { Router } from "express";
import chatBot from "../controllers/bot.controller.js";
import ValidateUserToken from "../middlewares/validateuser.js";
import ValidateChat from "../middlewares/bot/validatechat.js"
const router = Router();

router.post('/ai',ValidateUserToken,ValidateChat, chatBot);

export default router;