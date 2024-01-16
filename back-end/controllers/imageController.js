import cloudinary from "cloudinary";
import path from "path";
import Datauri from "datauri/parser.js";

const dUri = new Datauri();
const dataUri = (req) =>
    dUri.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
    );
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
export const upload = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    if (req.file) {
        const file = dataUri(req).content;
        return cloudinary.uploader
            .upload(file, { upload_preset: "blog", folder: "blog" })
            .then((result) => {
                const image = result.url;
                return res.status(200).json({
                    messge: "Your image has been uploded successfully to cloudinary",
                    data: {
                        image,
                    },
                });
            })
            .catch((err) =>
                res.status(400).json({
                    messge: "someting went wrong while processing your request",
                    data: {
                        err,
                    },
                })
            );
    }
};
