import { useSelector } from "react-redux";
import { userSelector } from "../../redux/auth";
import { useEffect, useState } from "react";
import Article from "../../components/Article/Article";
import Preloader from "../../components/Preloader/Preloader";
function Likes() {
    const { articles } = useSelector(state => state.article);
    const user = useSelector(userSelector);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (user && articles.items) {
            const likedPost = articles.items.filter(el => el.likedBy.includes(user._id));
            setData(likedPost);
            setIsLoading(false);
        }
    },[articles,user]);
    console.log(data);
    return (
        <div className="container" style={{ display: 'flex', flexDirection:'column',gap: '20px'}}>
            {isLoading ? (
                <Preloader/>
            ) : (
                data.map((article, index) => {
                    return (
                        <Article article={article} key={index} />
                    );
                })
            )}
        </div>
    );
}

export default Likes;