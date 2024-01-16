import s from './FullPost.module.scss';
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLike } from '../../redux/articles';
import { userSelector } from '../../redux/auth';
import Preloader from "../../components/Preloader/Preloader";

function FullPost() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false); 
    const [isMounting, setIsMounting] = useState(true);
    const { id } = useParams();
    
    useEffect(() => {
        if (user && data && isMounting) {
            setIsLiked(data.likedBy.includes(user._id));
            setIsMounting(false);
        }
    }, [user, data])
    
    useEffect(() => {
        instance
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.warn(err);
                alert("can't load article");
            });
    }, [id]);
    
    const handleLike = () => {
        dispatch(fetchLike(id));
        setData((prev) => ({
            ...prev,
            likes: prev.likes + (isLiked ? -1 : 1),
        }));
        setIsLiked(!isLiked);
    }
    if (isLoading) {
        return (
            <Preloader/>
        );
    }
    return (
        <div className={s.fullpost}>
            <div className={s.container}>
                <div className={s.fullpost__inner}>
                    {data.imageUrl && (
                        <div className={s.fullpost__image}>
                            <img
                                src={`${data.imageUrl}`}
                                alt=""
                            />
                        </div>
                    )}
                    <div className={s.actions}>
                        <div className={s.action}>
                            <FaRegHeart
                                className={`iconBtn iconBtn_m ${s.like} ${
                                    isLiked ? s.liked : ""
                                }`}
                                onClick={handleLike}
                            />
                            <span>{data.likes}</span>
                        </div>
                        <div className={s.action}>
                            <FaRegCommentDots
                                className={`iconBtn iconBtn_m ${s.bookmark}`}
                            />
                            <span>0</span>
                        </div>
                        <div className={s.action}>
                            <MdOutlineRemoveRedEye
                                className={`iconBtn iconBtn_m`}
                            />
                            <span>{data.viewsCount}</span>
                        </div>
                    </div>
                    {data.tags && (
                        <div className={s.tags}>
                            {data.tags.map((tag) => {
                                return (
                                    <div className={s.tag} key={tag._id}>
                                        {tag.name}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className={s.user}>
                        {data.user.avatarUrl ? (
                            <img
                                src={`${data.user.avatarUrl}`}
                                alt=""
                            />
                        ) : (
                            <img src={"https://placehold.co/50x50"} alt="" />
                        )}
                        <div className={s.name}>{data.user.fullname}</div>
                    </div>
                    <div className={s.title}>{data.title}</div>
                    <div
                        className={s.content}
                        dangerouslySetInnerHTML={{ __html: data.text }}
                    />
                </div>
            </div>
        </div>
    );
}

export default FullPost;