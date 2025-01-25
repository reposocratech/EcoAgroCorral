import express from "express";
import experienceController from "./experience.controller.js";
import uploadImageMulti from '../../middlewares/multerMultifields.js';
import uploadImage from "../../middlewares/multerSingle.js";
import uploadImages from "../../middlewares/multerArray.js";

const router = express.Router();

router.post("/addExperience", uploadImageMulti("experiences"), experienceController.addExperience);
router.put("/editExperience/:id", experienceController.editExperience);
router.post("/addMainPicture/:id", uploadImage("experiences"), experienceController.addMainPicture);
router.post("/addImagesByExperiences/:id",uploadImages("experiences"), experienceController.addImagesByExperience);
router.delete("/deletePicture/:id", experienceController.deletePicture);
router.post("/addFeature/:expId", uploadImage("features"), experienceController.addFeatures);
router.put("/editFeature/:featureId", uploadImage("features"), experienceController.editFeatures);
router.delete("/deleteFeature/:featureId", experienceController.deleteFeature);
router.get("/getAllExperiences", experienceController.getAllExperiences);
router.get("/getOneExperience/:id", experienceController.getOneExperience);
router.put("/disableExperience/:id", experienceController.disableExperience);

export default router;