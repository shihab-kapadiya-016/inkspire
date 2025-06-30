import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getPostByIdService = async (postId) => {
    if (!postId) {
        throw new ApiError(400, "Post ID is required");
    }

    const post = await Post.findById(postId).select("-__v -authorId");

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    return post;
};

const getPostById = asyncHandler(async (req,res) => {
    const {id} = req.params

    if(!id) {
        throw new ApiError(400, "Post ID is required")
    }

    const post = await Post.findById(id)

    if(!post) {
        throw new ApiError(404, "Post not found")
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, "Post fetched  successfully" , post)
    )
})

const createPost = asyncHandler(async (req,res) => {
    try {
        const {title, description} = req.body
    
        if(!title) {
            throw new ApiError(400, "Title is required")
        }
    
        const thumbnailLocalPath = req.file?.path
    
        if(!thumbnailLocalPath) {
            throw new ApiError(400, "Thumbnail is required")
        }
    
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    
        const post = await Post.create({
            title,
            description: description || "",
            thumbnail: thumbnail.url,
            authorId: req.user._id
        })

        const formattedPost = await getPostByIdService(post._id)

    
        const user = await User.findById(req.user._id)
    
        if(!user) {
            throw new ApiError(404, "User not found")
        }
    
        user.postId.push(post._id)
        await user.save()
    
    
        res
        .status(201)
        .json(
            new ApiResponse(200, "Post created successfully", formattedPost)
        )
    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})

const getAllPosts = asyncHandler(async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: - 1}).select("-__v ")

        res
        .status(200)
        .json(
            new ApiResponse(200, "Posts fetched successfully", posts)
        )
        
    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})


const deletePost = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params
    
        if(!id) {
            throw new ApiError(400, "Post ID is required")
        }
        console.log(req.user)
    
        await Post.findByIdAndDelete(id)
    
        const user = await User.findById(req.user._id)
        
    
        if(!user) {
            throw new ApiError(404, "User not found")
        }
    
        user.postId = user.postId.filter(postId => postId.toString() !== id)
        await user.save()


        res
        .status(200)
        .json(
            new ApiResponse(200, "Post deleted successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error " + error.message)
        
    }
})

const updatePost = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body
    
        if(!id) {
            throw new ApiError(400, "Post ID is required")
        }
    
        if(!title && !description) {
            throw new ApiError(400, "Title or description is required")
        }
    
        const post = await Post.findById(id)
    
        if(!post) {
            throw new ApiError(404, "Post not found")
        }
    
        if(title) {
            if(description) {
                post.description = description
            }
            post.title = title
        } 
    
        if(req.file) {
            const thumbnailLocalPath = req.file.path
            const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
            post.thumbnail = thumbnail.url
        }
    
        await post.save()

        const updatedPost = await getPostByIdService(post._id)
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "post updated successfully", updatedPost)
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error " + error.message)
    }
})

const toggleLikes = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params
    
        if (!id) {
            throw new ApiError(400, "Post ID is required")
        }
    
        const post = await Post.findById(id)
    
        if (!post) {
            throw new ApiError(404, "Post not found")
        }
        
        if (post.likes.includes(req.user._id)) {
            post.likes = post.likes.filter(userId => userId.toString() !== req.user._id.toString())
        } else {
            post.likes.push(req.user._id)
        }
    
        await post.save()
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "Post liked/unliked successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error " + error.message)
    }
    
})

const getAllPostsOfUser = asyncHandler(async (req,res) => {
    try {
        const user = await User.findById(req.user._id)

        if(!user) {
            throw new ApiError(404, "User not found")
        }
        
        const postIds = user.postId


        if(!postIds) {
            throw new ApiError(404, "PostIds not found")
        }


        const posts = await Promise.all(
            postIds.map(async (id) => await Post.findById(id))
        )

        res
        .status(200)
        .json(
            new ApiResponse(200, "posts fetched successfully", posts)
        )

    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})



export {
    createPost,
    getAllPosts,
    deletePost,
    updatePost,
    toggleLikes,
    getAllPostsOfUser,
    getPostById
}