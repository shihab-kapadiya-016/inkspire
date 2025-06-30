import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const postComment = asyncHandler(async (req,res) => {
    try {
        const {postId} = req.params
    
        if(!postId) {
            throw new ApiError(400, "Post ID is required")
        }
    
        const {content} = req.body
    
        if(!content) {
            throw new ApiError(400, "Please provide content for the comment")
        }
    
        const comment = await Comment.create({
            content,
            postId,
            authorId:(req.user._id)
        })
    
        const formattedComment = await Comment.findById(comment._id).select("-__v -authorId")

        const post = await Post.findByIdAndUpdate(postId, {
            $push: {commentIds: comment._id}
        }, {
            new: true
        })
    
        res
        .status(201)
        .json(
            new ApiResponse(200, "Comment posted successfully", formattedComment)
        )
    } catch (error) {
        throw new ApiError(500, "Internal Server Error " + error.message)
    }
})

const deleteComment = asyncHandler(async (req,res) => {
    const {commentId} = req.params

    const comment  = await Comment.findById(commentId)

    if(!comment) {
        throw new ApiError(404, "Comment not found")
    }

    const post = await Post.findByIdAndUpdate(comment.postId, {
        $pull: {comments: commentId}
    }, {
        new: true
    })

    await Comment.findByIdAndDelete(commentId)

    res
    .status(200)
    .json(
        new ApiResponse(200, "Comment deleted successfully", post)
    )
})

const getAllCommentsOfPost = asyncHandler(async (req,res) => {
    try {
        const {postId} = req.params
    
        const post = await Post.findById(postId)
        
        if(!post) {
            throw new ApiError(404, "Post not found")
        }
    
        const commentIds = post.commentIds
        const comments = await Comment.find({_id: {$in: commentIds}})
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "Comments fetched successfully", comments)
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error: " + error.message)
    }
})

const giveReplyToComment = asyncHandler(async (req,res) => {
    try {
        const {commentId} = req.params
    
        const {content} = req.body
    
        const comment = await Comment.findById(commentId)
    
        if(!comment) {
            throw new ApiError(404, "Comment not found")
        }
    
        const reply = await Comment.create({
            content,
            postId: comment.postId,
            authorId: req.user._id,
            parentCommentId: commentId
        })
    

        res
        .status(201)
        .json(
            new ApiResponse(201, "Reply posted successfully", reply)
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error: " + error.message)
    }
})

const getAllRepliesOfComment = asyncHandler(async (req,res) => {
    try {
        const {commentId} = req.params
    
        const comment = await Comment.findById(commentId)
    
        const replyIds = comment.replies
    
        const replies = await Comment.findById({$in: replyIds})
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "Replies fetched successfully", replies)
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error: " + error.message)
    }
})

const toggleLikes = asyncHandler(async (req,res) => {
    try {
        const {commentId} = req.params
    
        const comment = await Comment.findById(commentId)
    
        if(!comment) {
            throw new ApiError(404, "Comment not found")
        }

    
        if(comment.likes.includes(req.user._id)){
            const comment = await Comment.findByIdAndUpdate(commentId, {
                $pull: {likes: req.user._id}
                }, {new:true,})
        } else {
            const comment = await Comment.findByIdAndUpdate(commentId, {
                $push: {likes: req.user._id}
            }, {new:true,})
        }
    
        await comment.save()
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "Comment likes toggled successfully", comment)
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error: " + error.message)
    }
})

export {
    postComment,
    deleteComment,
    getAllCommentsOfPost,
    giveReplyToComment,
    getAllRepliesOfComment,
    toggleLikes
}