import express from "express";
import multerArray from "../../middlewares/multerArray.js";
import multerSingle from "../../middlewares/multerSingle.js";
import adminController from "./admin.controller.js";
const router = express.Router();

router.get('/getAllUsers', adminController.getAllUsers)
router.put("/enableUser", adminController.enableUser);
router.put("/disableUser", adminController.disableUser);
router.get('/getAllReservations', adminController.getAllReservations);
router.delete("/cancelReservation", adminController.cancelReservation);


export default router;