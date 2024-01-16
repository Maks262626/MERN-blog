//ECKPNS4SmMgctP7m
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js'
import multer from 'multer';
import cors from 'cors';
import checkAuth from './middleware/checkAuth.js';
import handleValidationErrors from './middleware/handleValidationErrors.js';
import { registerValidator, loginValidator, postCreateValidator } from './validations/index.js'; 
import {
    UserController,
    PostController,
    TagController,
    ImageController,
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
const PORT = process.env.PORT || 3000;
const storage = multer.memoryStorage();
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

app.post('/auth/register',registerValidator,handleValidationErrors, UserController.register);
app.post('/auth/login',loginValidator,handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get("/last-users", UserController.getLastUsers);

app.put("/user/image-update",checkAuth,handleValidationErrors, UserController.updateImage);

app.post("/upload", upload.single("image"), ImageController.upload);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.get('/my-posts',checkAuth, PostController.getPostByUser);
app.post('/posts',checkAuth,postCreateValidator,handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.put('/posts/:id', checkAuth,PostController.addLike);
// app.patch("/posts/:id", checkAuth, postCreateValidator, handleValidationErrors, PostController.update);


app.get("/tags", TagController.getAll);
app.get("/tags/:id", TagController.getByTag);



app.listen(PORT, err => {
    if (err) {
        console.log(`Error Server: ${err}`);
    }
    console.log(`Server running on PORT ${PORT}`);
})