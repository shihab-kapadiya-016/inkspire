import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshTokens = async (_id) => {
    try {
        const user = await User.findById(_id)
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Error while generating tokens" + error.message)
    }

}


const registerUser = asyncHandler(async (req,res) => {
    const {username, email , password} = req.body

    if([username,email,password].some((field) => field.trim() === "")) {
        throw new ApiError(401, "all fields are required ")
    }

    const existedUser = await User.findOne({
        $or: [{ username } , { email }]
    })

    if (existedUser) {
        throw new ApiError(401 ,"User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(401,"avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    await User.create({
        username,
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage.url || ""
    })

    const createdUser = await User.findOne({username}).select("-password -__v")

    res
    .status(201)
    .json(
        new ApiResponse(201, "User created successfully")
    )

})

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    if([email,password].some((field) => field.trim() === "")) {
        throw new ApiError(401, "All fields are required")
    }

    const user = await  User.findOne({email})


    if(!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    

    if(!isPasswordCorrect) {
        throw new ApiError(401, "Password is not correct")
    }

    const {accessToken , refreshToken } = await generateAccessAndRefreshTokens(user._id)

    user.refreshToken = refreshToken
    user.save()


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -__v")

    res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, "logged In successfully")
    )
})

const logout = asyncHandler(async (req,res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: undefined
            }
        }, {
            new: true
        })
    
        res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, "User logged out successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Error while logging out user" + error.message)
    }
})

const getCurrentUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken -__v")

    res
    .status(200)
    .json(
        new ApiResponse(200, "User recieved successfully", user)
    )
})

const refreshAccessToken = asyncHandler(async (req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "Refresh Token is required")
    }

    const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    if(!decodedToken) {
        throw new ApiError(401, "Refresh Token used or expired")
    }

    const user = await User.findById(decodedToken._id)

    if(!user) {
        throw new ApiError(404, "User not found")
    }

    if(user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(403, "Invalid refresh Token")
    }

    const {accessToken, refreshToken} = generateAccessAndRefreshTokens(user._id)

    user.refreshToken = refreshToken
    user.save() 

    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, "token refreshed successfully")
    )
    
})

const changePassword = asyncHandler(async (req,res) => {
    try {
        
        const {newPassword} = req.body
        console.log(newPassword);
        
    
        const user = await User.findById(req.user._id)
    
        if(!user) {
            throw new ApiError(404, "User not found")
        }
    
        user.password = newPassword
        user.save({validateBeforeSave: false})
        console.log(user.password)
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "Password changed successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Error while updating password " + error.message) 
    }

})

const changeUsername = asyncHandler(async (req,res) => {
    try {
        const {newUsername} = req.body
    
        if(!newUsername) {
            throw new ApiError(401, "Please provide the usernama")
        }
    
        const user = await User.findById(req.user._id)
    
        if(!user) {
            throw new ApiError(404, "User not found")
        }
    
        user.username = newUsername
        user.save()
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "username changed successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Error while updating username " + error.message) 
    }
})

const changeEmail = asyncHandler(async (req,res) => {
    try {
        const {newEmail} = req.body
    
        if(!newEmail) {
            throw new ApiError(401, "Please provide the usernama")
        }
    
        const user = await User.findById(req.user._id)
    
        if(!user) {
            throw new ApiError(404, "User not found")
        }
    
        user.email = newEmail
        user.save()
    
        res
        .status(200)
        .json(
            new ApiResponse(200, "email changed successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Error while updating email " + error.message) 
    }
})

const deleteUser = asyncHandler(async (req,res) => {
    
    await User.findByIdAndDelete(req.user._id)

    res
    .status(200)
    .json(
        new ApiResponse(200, "User deleted successfully")
    )
})

const changeAvatar = asyncHandler(async (req,res) => {


    const avatarFilePath = req.file.path

    const avatar = await uploadOnCloudinary(avatarFilePath)

    const user = await User.findById(req.user._id)

    user.avatar = avatar
    user.save()


    res
    .status(200)
    .json(
        new ApiResponse(200, "avatar changed successfully")
    )
})

const changeCoverImage = asyncHandler(async (req,res) => {

    const coverImageFilePath = req.file.path

    if(!coverImageFilePath) {
        throw new ApiError(404, "Cover image path not found")
    }

    const coverImage = await uploadOnCloudinary(coverImageFilePath)

    const user = await User.findById(req.user._id)

    user.coverImage = coverImage
    user.save()


    res
    .status(200)
    .json(
        new ApiResponse(200, "coverImage changed successfully")
    )
})

export {
    registerUser,
    loginUser,
    logout,
    getCurrentUser,
    refreshAccessToken,
    changePassword,
    changeUsername,
    changeEmail,
    deleteUser,
    changeAvatar,
    changeCoverImage
}