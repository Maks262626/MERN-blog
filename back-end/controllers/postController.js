import PostModel from '../models/Post.js';
import CommentModel from '../models/Comment.js';

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't create article"
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate({ path: "user", select: ["fullname", "avatarUrl"] })
            .populate({ path: "tags" })
            .exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed getting article"
        });
    }
}

export const getPostByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const posts = await PostModel.find({ user: userId });
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed getting article",
        });
    }
} 

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: "after" }
        )
            .populate({ path: "user", select: ["fullname", "avatarUrl"] })
            .populate({ path: "tags" })
            .populate({
                path: "comments",
                populate: [{path:"replies",populate:{path:"user"}},{path:"user"}],
            });

        if (!updatedPost) {
            return res.status(404).json({
                message: "Article not found",
            });
        }

        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed getting article",
        });
    }
};
export const addLike = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;
        const post = await PostModel.findById(postId).populate({
            path: "tags",
        });
        if (!post) {
            return res.status(404).json({
                message: "Article not found",
            });
        }
        const isLiked = post.likedBy.includes(userId);
        if (isLiked) {
            post.likes--;
            post.likedBy = post.likedBy.filter(
                (id) => id.toString() !== userId.toString()
            );
        } else {
            post.likes++;
            post.likedBy.push(userId);
        }
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed getting article",
        });
    }
    
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await PostModel.findOneAndDelete({ _id: postId });
        if (!deletedPost) {
            return res.status(404).json({
                message: "article not found",
            });
        }
        await CommentModel.deleteMany({ post: postId });
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed getting article",
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        if (!updatedPost) {
            return res.status(404).json({
                message: "article not found",
            });
        }
        res.json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed getting article",
        });
    }
}