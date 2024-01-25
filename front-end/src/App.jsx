import "./App.scss";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";
import AddPost from "../pages/AddPost/AddPost";
import FullPost from "../pages/FullPost/FullPost";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe} from "../redux/auth";
import MyPosts from "../pages/MyPosts/MyPosts";
import PostsByTag from "../pages/PostsByTag/PostsByTag";
import User from "../pages/User/User";
import { fetchArticles } from "../redux/articles";
import Likes from "../pages/Likes/Likes";
import RickRoll from "../pages/RickRoll/RickRoll";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAuthMe());
        dispatch(fetchArticles())
    }, []);
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/addpost" element={<AddPost />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/my-posts" element={<MyPosts />} />
                    <Route path="/tags/:id" element={<PostsByTag />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/likes" element={<Likes />} />
                    <Route path="/info" element={<RickRoll/>} />
                </Routes>
            </main>
        </>
    );
}

export default App;
