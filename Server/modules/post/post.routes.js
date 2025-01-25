import express from "express";
import postController from "./post.controller.js";
import multerSingle from '../../middlewares/multerSingle.js'
import multerArray from '../../middlewares/multerArray.js'

const router = express.Router();

router.get('/getAllPost', postController.getAllPost);
router.get('/getDataPost/:post_id', postController.getDataPost);
router.put('/editPost',multerSingle("post"), postController.editPost);
router.delete('/deleteImg/:id', postController.deleteImg);
router.post('/addFiles/:post_id', multerArray("post"), postController.addFiles);


export default router;