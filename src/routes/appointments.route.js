import {Router} from 'express';
import ValidateUserToken from '../middlewares/validateuser.js';

const router = Router();
router.use(ValidateUserToken);
router.get("/");
router.post("/");
router.patch("/:id");
router.get("/:id");
// router.delete("/");



export default router;