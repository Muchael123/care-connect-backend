import {Router} from 'express';
import ValidateUserToken from '../middlewares/validateuser.js';
import addAppointment from '../controllers/appointments/addappointment.controller.js';
import validateAppointment from "../middlewares/validateappointment.js";
import getAppointments from '../controllers/appointments/getApppointments.js';
import updateAppointment from '../controllers/appointments/updateAppointment.js';
import deleteAppointment from '../controllers/appointments/deleteAppointment.js';

const router = Router();

router.post("/",ValidateUserToken,validateAppointment, addAppointment);
router.get("/",ValidateUserToken, getAppointments);
router.patch("/:appointmentid",ValidateUserToken,updateAppointment);
router.delete("/:appointmentid",ValidateUserToken,deleteAppointment);


export default router;