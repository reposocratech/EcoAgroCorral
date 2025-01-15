import express from 'express';
import HikeController from './hike.controller.js';
import {tokenVerify} from '../../middlewares/verifyToken.js';
import uploadImageMulti from '../../middlewares/multerArray.js';
const router = express.Router();


router.post('/createHike',  uploadImageMulti("hikes"), HikeController.createHike);
router.get('/findHike/:id', HikeController.getHikeById);
router.delete('/hikeDel/:id', HikeController.deleteHike);
router.put('/hikeRes/:id', HikeController.restoreHike);
router.put('/hikeUpdate/:id',uploadImageMulti("hikes"), HikeController.updateHike); 
router.get('/findAllHikes', HikeController.getAllHikes); 
export default router;