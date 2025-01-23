import express from "express";
import postController from "./post.controller.js";

const router = express.Router();

router.get('/getAllPost', postController.getAllPost)



export default router;