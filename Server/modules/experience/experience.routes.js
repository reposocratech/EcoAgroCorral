import express from "express";
import experienceController from "./experience.controller.js";

const router = express.Router();

router.get("/getAllExperiences", experienceController.getAllExperiences);

router.get("/getOneExperience/:id", experienceController.getOneExperience);

export default router;