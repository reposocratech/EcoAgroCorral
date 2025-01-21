import express from "express";
import experienceController from "./experience.controller.js";
import uploadImageMulti from '../../middlewares/multerMultifields.js';

const router = express.Router();

router.post("/addExperience", uploadImageMulti("experiences"), experienceController.addExperience);
//router.post("/addFeatures", uploadImageMulti("features"), experienceController.addFeatures);
router.get("/getAllExperiences", experienceController.getAllExperiences);
router.get("/getOneExperience/:id", experienceController.getOneExperience);

export default router;