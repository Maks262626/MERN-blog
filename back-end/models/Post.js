import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
       tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
            default: [],
            required: true
        }],
        viewsCount: {
            type: Number,
            default: 0,
        },
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
        imageUrl: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Post", PostSchema);