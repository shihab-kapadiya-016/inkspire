import {Schema, SchemaType, model} from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    commentIds: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: []
    }],
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {timestamps:true})

export const Post = model("Post", postSchema)