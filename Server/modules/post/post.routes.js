import express from "express";
import postController from "./post.controller.js";

import uploadImageMulti from '../../middlewares/multerArray.js';
const router = express.Router();

// Routes for posts
router.post("/createPost",uploadImageMulti("posts"), postController.createPost); // Create a new post
router.get("/getAllPosts", postController.getAllPosts); // Get all posts
router.get("/findPost/:postId", postController.getPostById); // Get a single post by ID



// Routes for categories
router.post("/categories", postController.createCategory); // Create a new category
router.get("/categories", postController.getAllCategories); // Get all categories


router.delete("/categories/:categoryId", postController.deleteCategory); // Delete a category

// Routes for post pictures
router.post("/posts/:postId/pictures", postController.addPostImages); // Add pictures to a post

import multerSingle from '../../middlewares/multerSingle.js'
import multerArray from '../../middlewares/multerArray.js'



router.get('/getAllPost', postController.getAllPost);
router.get('/getDataPost/:post_id', postController.getDataPost);
router.put('/editPost',multerSingle("posts"), postController.editPost);
router.delete('/deleteImg/:id', postController.deleteImg);
router.post('/addFiles/:post_id', multerArray("posts"), postController.addFiles);
router.delete('/deletePost/:post_id', postController.deletePost);



export default router;
