import {Router} from 'express';
import ValidateUserToken from '../middlewares/validateuser.js';
import addAppointment from '../controllers/appointments/addappointment.controller.js';
import validateAppointment from "../middlewares/validateappointment.js";
import getAppointments from '../controllers/appointments/getApppointments.js';
// import updateAppointment from '../controllers/appointments/updateAppointment.js';

const router = Router();

router.post("/",ValidateUserToken,validateAppointment, addAppointment);
router.get("/",ValidateUserToken, getAppointments);
//patients
router.patch("/:id");
router.get("/:id");
router.delete("/:id");





export default router;