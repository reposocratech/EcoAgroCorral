import express from "express";
import reservationController from "./reservation.controller.js";

const router = express.Router();


router.get('/getDates', reservationController.getDates);
router.get('/getOneReservation/:reservation_id', reservationController.getOneReservation);
router.delete('/deleteReservation/:reservation_id', reservationController.deleteReservation);
router.put('/modifyReservation/:reservation_id', reservationController.modifyReservation);



export default router;