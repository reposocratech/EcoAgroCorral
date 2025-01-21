import express from "express";
import reservationController from "./reservation.controller.js";

const router = express.Router();


router.get('/getDates', reservationController.getDates);
router.get('/getOneReservation/:reservation_id', reservationController.getOneReservation);
router.delete('/deleteReservation', reservationController.deleteReservation);
router.put('/modifyReservation', reservationController.modifyReservation);



export default router;