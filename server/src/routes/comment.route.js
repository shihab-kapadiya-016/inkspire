import { Router } from "express";
import 
    { 
        postComment,
        deleteComment, 
        getAllCommentsOfPost,
        giveReplyToComment,
        getAllRepliesOfComment,
        toggleLikes
    } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/post-comment/:postId").post(verifyJWT,postComment)
router.route("/delete-comment/:commentId").delete(verifyJWT,deleteComment)
router.route("/get-comments/:postId").get(verifyJWT,getAllCommentsOfPost)
router.route("/reply-comment/:commentId").post(verifyJWT, giveReplyToComment)
router.route("/get-replies/:commentId").get(verifyJWT, getAllRepliesOfComment)
router.route("/toggle-like/:commentId").patch(verifyJWT, toggleLikes)

export default router