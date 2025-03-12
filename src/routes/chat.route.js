import { Router } from "express";
import chatBot from "../controllers/bot.controller.js";
import ValidateUserToken from "../middlewares/validateuser.js";
import ValidateChat from "../middlewares/bot/validatechat.js";
import UserChat from "../controllers/users/message.js";
const router = Router();

router.post('/ai',ValidateUserToken,ValidateChat, chatBot);
// router.get('/ai',ValidateUserToken )
router.post('/users', ValidateUserToken, UserChat);

export default router;