import { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import s from './Home.module.scss';
import TabsComponent from "../../components/TabsComponents/TabsComponents";
import Tags from "../../components/Tags/Tags";
import Users from "../../components/Users/Users";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, fetchTags } from "../../redux/articles";
import instance from "../../axios";
import { Link } from "react-router-dom";
function Home() {
    const dispatch = useDispatch();
    const { articles,tags } = useSelector((state) => state.article);
    const [lastUsers, setLastUsers] = useState([]);
    useEffect(() => {
        dispatch(fetchArticles());
        dispatch(fetchTags());
        instance.get("/last-users/4").then(res => {
            setLastUsers(res.data);
        });
    },[]);

    const tablist = ["New", "Popular","Most Liked"];
    const newArticles = [...articles.items].reverse();
    const popularArticles = [...articles.items].sort(
        (a, b) => b.viewsCount - a.viewsCount
    );
    const mostLikedArticles = [...articles.items].sort((a, b) => b.likes - a.likes);
    return (
        <div className={s.home}>
            <div className="container">
                <div className={s.home__inner}>
                    <div className={s.content}>
                        <TabsComponent
                            tablist={tablist}
                            tabPanel={[
                                newArticles,
                                popularArticles,
                                mostLikedArticles,
                            ]}
                            status={articles.status}
                        />
                    </div>
                    <div className={s.sidebar}>
                        <div className={s.sidebarWidget}>
                            <Link
                                className={`btn`}
                                to="/info"
                            >
                                Try New Function
                            </Link>
                            <Users users={lastUsers} />
                            <Tags title="Top Categories" tags={tags} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
