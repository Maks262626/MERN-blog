import { useEffect, useState } from "react";
import instance from "../../axios";
import Article from "../../components/Article/Article";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";

function PostsByTag() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        instance.get(`/tags/${id}`).then(res => {
            setPosts(res.data);
        }).catch(err => {
            alert(err);
        });
        setIsLoading(false);
    },[]);
    return (
        <div
            className="container"
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
            {loading ? (
                <Preloader/>
            ) : (
                posts.map((article, index) => {
                    return <Article article={article} key={index} />;
                })
            )}
        </div>
    );
}

export default PostsByTag;