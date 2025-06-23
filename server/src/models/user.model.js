import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true
    },
    
    password: {
        type:String,
        required: [ true, "password is required"],
    },

    avatar: {
        type: String,
        required: true
    },

    coverImage: {
        type: String,
    },
    
    refreshToken: {
        type: String
    },



} , {timestamps : true})


userSchema.pre("save", async  function (next) {
    if(!this.isModified("password")) return next

    this.password = await bcrypt.hash(this.password, 10)
    next() 
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        username: this.username
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)}


export const User = model("User", userSchema)