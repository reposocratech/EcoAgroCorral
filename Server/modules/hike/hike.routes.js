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
router.get('/findAllDelHikes', HikeController.getAllDelHikes); 
router.post('/addHikeImages/:id', uploadImageMulti("hikes"), HikeController.addHikeImages);
router.post('/addHikeMainImage/:id', uploadImageMulti("hikes"), HikeController.addHikeMainImage);
router.delete('/deleteHikeImage/:imageId', HikeController.deleteHikeImageById);
router.get("/:hikeId/experiences", HikeController.getExperiencesByHike);
router.post("/:hikeId/experiences/:experienceId", HikeController.assignExperienceToHike);
router.post("/:hikeId/experiences", HikeController.assignExperiencesToHike);
router.delete("/:hikeId/experiences", HikeController.deleteExperiencesFromHike);
router.delete("/:hikeId/experiences/:experienceId", HikeController.removeExperienceFromHike);
router.get("/:hikeId/unassigned-experiences", HikeController.getExperiencesUnassigned);
export default router;