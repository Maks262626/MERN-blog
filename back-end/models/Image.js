import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
});
export default mongoose.model("Image", imageSchema);
