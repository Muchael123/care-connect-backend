import { Router } from "express";
import ValidateUserToken from "../middlewares/validateuser.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import fetchSummary from "../controllers/admin/getSummary.js";
import hospitalValidate from "../middlewares/admin/hospitalvalidate.js";
import addHospital from "../controllers/admin/addHospital.js";
import updateHospital from "../controllers/admin/updatehospital.js";
import validateHospitalUpdate from "../middlewares/admin/validatehospitaUpdate.js";
import deleteHospital from "../controllers/admin/deleteHospital.js";
import addNurse from "../controllers/admin/addNurse.js";
import getAllHospitals from "../controllers/admin/allhospitals.js";


const router = Router();

router.use(ValidateUserToken);
router.use(checkAdmin);
router.get("/summary", fetchSummary);
router.get("/hospitals", getAllHospitals);
router.post("/hospital",hospitalValidate, addHospital);
router.patch("/hospital/:hospitalid",validateHospitalUpdate, updateHospital);
router.delete("/hospital/:hospitalid", deleteHospital);

//nurses
router.post("/nurse", addNurse);



export default router;