import { Router } from "express";
import validateRegDetails from "../middlewares/validatereg.js";
import  ValidateLogDetails from "../middlewares/validatelogin.js"
import RegisterUser from "../controllers/reg.controller.js";
import HashPassword from "../middlewares/hashpass.js";
import Login from "../controllers/login.controller.js";

const router = Router();
router.get('/', (req, res) => {
    res.send("Hello world");
})
router.post('/register', validateRegDetails, HashPassword, RegisterUser);
router.post("/login",  ValidateLogDetails, Login)

export default router