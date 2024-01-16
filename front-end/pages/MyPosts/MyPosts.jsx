import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelector, userSelector } from "../../redux/auth";
import Article from "../../components/Article/Article";
import { MdDeleteForever } from "react-icons/md";
import s from './MyPosts.module.scss';
import { fetchArticles, fetchDeleteArticle } from "../../redux/articles";
import Preloader from "../../components/Preloader/Preloader";
function MyPosts() {
    const isAuth = useSelector(isAuthSelector);
    const user = useSelector(userSelector);
    const [myArticles, setMyArticles] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const handleDelete = (article) => {
        dispatch(fetchDeleteArticle(article._id));
        setMyArticles(prev => prev.filter(el => el._id !== article._id));
    };
    const fetchMyPosts = async () => {
        setIsLoading(true);
        const { payload } = await dispatch(fetchArticles());
        if (user && isAuth) {
            const myPosts = payload.filter((article) => {
                return article.user._id === user._id;
            });
            setMyArticles(myPosts);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchMyPosts();
    }, [isAuth, user]);
    
    return (
        <div className={s.container}>
            {loading ? (
                <Preloader/>
            ) : (
                myArticles.map((article, index) => {
                    return (
                        <div className={s.articleWrapper} key={index}>
                            <Article article={article} />
                            <div
                                className={`${s.delete}`}
                                onClick={() => handleDelete(article)}
                            >
                                <MdDeleteForever className="iconBtn" />
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default MyPosts;