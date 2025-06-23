
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

const verifyJWT =  async (req,_,next) => {
    try {
        const refreshToken = req.cookies.refreshToken
    
        if(!refreshToken) {
            throw new ApiError(401, "token used or expired")
        }
        
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    
        req.user = user
    
        next()
    } catch (error) {
        throw new ApiError(500, "Error while verifying refresh Token " + error.message)
    }

}

export {verifyJWT}