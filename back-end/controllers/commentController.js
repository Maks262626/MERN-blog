import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const create = async (req, res) => {
    try {
        const doc = new CommentModel({
            text: req.body.text,
            post: req.body.postId,
            user: req.userId,
        });
        doc.populate({ path: "user", select: ["fullname", "avatarUrl"] });
        const comment = await doc.save();
        if (req.body.replyedCommentId) {
            const replyedComment = await CommentModel.findById(req.body.replyedCommentId);
            replyedComment.replies.push(comment._id);
            await replyedComment.save();
        } else {
            const post = await PostModel.findById(req.body.postId);
            post.comments.push(comment._id);
            await post.save();
        }
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't create comment"
        });
    }
}

export const addLike = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.userId;
        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const isLiked = comment.likedBy.includes(userId);
        if (isLiked) {
            comment.likes--;
            comment.likedBy = comment.likedBy.filter(
                (id) => id.toString() !== userId.toString()
            );
        } else {
            comment.likes++;
            comment.likedBy.push(userId);
        }
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't add like to comment",
        });
    }
};

export const remove = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await CommentModel.findById(commentId);
        if (comment.replies.length > 0) {
            comment.replies.map(async (id) => {
                await CommentModel.findByIdAndDelete(id);
            });
        }
        await CommentModel.findByIdAndDelete(commentId);

        const comments = await CommentModel.find();
        const replyedComment = comments.find(c => c.replies.includes(commentId));
        if (replyedComment) {
            replyedComment.replies = replyedComment.replies.filter(
                (id) => id.toString() !== commentId.toString()
            );
            await replyedComment.save();
        }

        // if (postId) {
        const post = await PostModel.findById(comment.post._id);
        post.comments = post.comments.filter((id) => id.toString() !== commentId.toString());
        await post.save();
        // }

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't delete comment",
        });
    }
};