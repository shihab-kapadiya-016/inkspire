import {Schema, model} from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    }
}, {timestamps: true})

export const Comment = model("Comment", commentSchema)