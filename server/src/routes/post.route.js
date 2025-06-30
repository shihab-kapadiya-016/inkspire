import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    createPost, 
    deletePost, 
    getAllPosts, 
    getAllPostsOfUser, 
    getPostById, 
    toggleLikes, 
    updatePost
} from "../controllers/post.controller.js";

const router = express.Router();

router.route("/create-post").post(verifyJWT, upload.single("thumbnail"), createPost)
router.route("/posts").get( getAllPosts)
router.route("/delete-post/:id").delete(verifyJWT, deletePost)
router.route("/update-post/:id").put(verifyJWT, upload.single("thumbnail"), updatePost)
router.route("/toggle-likes/:id").put(verifyJWT, toggleLikes)
router.route("/get-posts-of-user").get(verifyJWT, getAllPostsOfUser)
router.route("/get-post-by-id/:id").get(verifyJWT, getPostById)

export default router;