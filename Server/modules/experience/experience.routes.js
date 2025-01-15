import express from "express";
import experienceController from "./experience.controller.js";

const router = express.Router();

router.get("/getAllExperiences", experienceController.getAllExperiences);

export default router;