import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: [],
            required: true
        }],
        likes: {
            type: Number,
            default: 0
        },
        likedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Comment", CommentSchema);