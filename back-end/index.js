import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js'
import multer from 'multer';
import cors from 'cors';
import checkAuth from './middleware/checkAuth.js';
import handleValidationErrors from './middleware/handleValidationErrors.js';
import {
    registerValidator,
    loginValidator,
    postCreateValidator,
    commentCreateValidator,
} from "./validations/index.js"; 
import {
    UserController,
    PostController,
    TagController,
    ImageController,
    CommentController,
} from "./controllers/index.js";

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("DB error", err);
    });


const app = express();
const PORT = process.env.PORT || 4000;
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//     destination: (_, __, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (_, file, cb) => {
//         console.log("file.originalname", file.originalname);
//         cb(null, file.originalname);
//     }
// });
const upload = multer({ storage });

// app.use(cors());
app.use(
    cors({
        origin: "https://stalwart-wisp-9caa9b.netlify.app",
        credentials: true,
    })
);


app.options("*", cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post("/upload", upload.single("image"), ImageController.upload);

app.get("/tags", TagController.getAll);
app.get("/tags/:id", TagController.getByTag);

app.post('/auth/register',registerValidator,handleValidationErrors, UserController.register);
app.post('/auth/login',loginValidator,handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);
app.get("/last-users/:id", UserController.getLastUsers);
app.put("/user/image-update",checkAuth,handleValidationErrors, UserController.updateImage);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.get('/my-posts',checkAuth, PostController.getPostByUser);
app.post('/posts',checkAuth,postCreateValidator,handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.put('/posts/:id', checkAuth,PostController.addLike);
app.patch("/posts/:id", checkAuth, postCreateValidator, handleValidationErrors, PostController.update);

app.post("/comment", checkAuth,commentCreateValidator,handleValidationErrors,CommentController.create);
app.put("/comment/:id", checkAuth, CommentController.addLike);
app.delete("/comment/:id", checkAuth, CommentController.remove);

app.listen(PORT, err => {
    if (err) {
        console.log(`Error Server: ${err}`);
    }
    console.log(`Server running on PORT ${PORT}`);
})