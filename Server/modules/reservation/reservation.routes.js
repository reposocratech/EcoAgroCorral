import express from "express";
import reservationController from "./reservation.controller.js";

const router = express.Router();


router.get('/getDates', reservationController.getDates);
router.get('/getOneReservation/:reservation_id', reservationController.getOneReservation);
router.put('/modifyReservation', reservationController.modifyReservation);
router.put('/setDays', reservationController.setDays);
router.get('/getDays', reservationController.getDays);



export default router;