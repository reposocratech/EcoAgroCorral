import express from "express";
import multerArray from "../../middlewares/multerArray.js";
import multerSingle from "../../middlewares/multerSingle.js";
import userController from "./user.controller.js";
import { tokenVerify } from "../../middlewares/verifyToken.js";
const router = express.Router();


router.post('/register', userController.register);
router.get('/confirmarEmail/:emailToken', userController.verifyEmail);
router.post('/resendVerification', userController.resendVerification);
router.get('/verificar/:token', userController.confirmEmail)
router.post('/login', userController.login);
router.get('/findUserById',tokenVerify, userController.findUserById)
router.post('/recoverPassword', userController.recoverPass)
router.get('/confirm/:token', userController.confirmToken)
router.put('/changePassword/:user_id',userController.changePassword)

router.get('/getReservations/:user_id', userController.getReservations)

router.put('/editUser', multerSingle("users"), userController.editUser);
router.get('/getExperience', userController.getExperience);
router.post('/createReservation', userController.createReservation);


export default router;