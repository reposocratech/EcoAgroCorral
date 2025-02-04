import express from "express";
import PaymentController from "./payment.controller.js";

const router = express.Router();

router.post("/create-payment-intent", PaymentController.checkoutSession);

export default router;