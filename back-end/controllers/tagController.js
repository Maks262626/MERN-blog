import TagModel from "../models/Tag.js";
import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
      try {
          const tags = await TagModel.find();
          return res.json(tags);
      } catch (error) {
          console.error("Failed to get available tags:", error);
          res.status(500).json({
              message: "can't get tags",
          });
      }
};
export const getByTag = async (req, res) => {
    try {
        const tagId = req.params.id;
        const articles = await PostModel.find({ tags: tagId })
            .populate({ path: "tags" })
            .populate({ path: "user", select: ["fullname", "avatarUrl"] })
            .exec();
     
        
        if (!articles) {
            return res.status(404).json({
                message: "Article not found",
            });
        }

        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed getting articles",
        });
    }
};