import {Router} from "express";
import ValidateUserToken from "../middlewares/validateuser.js";
import getNearbyHospitals from "../controllers/hospital/getnearby.controller.js";
import getDoctorsByHospitalId from "../controllers/hospital/getdoctors.controllers.js";

const router = Router();
router.get("/", ValidateUserToken, getNearbyHospitals );
router.get("/:id", ValidateUserToken, getDoctorsByHospitalId);

export default router;