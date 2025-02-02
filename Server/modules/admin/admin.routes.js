import express from "express";
import adminController from "./admin.controller.js";
const router = express.Router();

router.get('/getAllUsers', adminController.getAllUsers)
router.put("/enableUser", adminController.enableUser);
router.put("/disableUser", adminController.disableUser);
router.get('/getAllReservations', adminController.getAllReservations);
router.delete("/cancelReservation", adminController.cancelReservation);
router.get("/getAllExperiences", adminController.getAllExperiences);
router.put("/enableExperience", adminController.enableExperience);
router.put("/disableExperience", adminController.disableExperience);


export default router;