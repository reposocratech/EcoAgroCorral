import express from "express";
import multerArray from "../../middlewares/multerArray.js";
import multerSingle from "../../middlewares/multerSingle.js";
import userController from "./user.controller.js";

const router = express.Router();

router.post('/register', userController.register);
router.get('/confirmarEmail/:emailToken', userController.verifyEmail);
router.get('/verificar/:token', userController.confirmEmail)



export default router;