import { useState } from 'react';
import s from './Comments.module.scss'; 
import { FaRegHeart } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import instance from '../../axios';
import CommentInput from './CommentInput';

function Comment({
    comment,
    user,
    replyedCommentId,
    comments,
    postId,
    setComments,
}) {
    const [data, setData] = useState(comment);
    const [value, setValue] = useState("");
    const [isReplying, setIsReplying] = useState(false);
    const [isLiked, setIsLiked] = useState(
        data.likedBy.includes(user._id)
    );
    const isCommentByCurrentUser =
        user && data.user._id.toString() === user._id.toString();
    const handleCancel = () => {
        setValue("");
        setIsReplying(false);
    };
    const handleDelete = async () => {
        await instance.delete(`/comment/${data._id}`);
        const mainComment = comments.find(
            (c) => c._id.toString() === data._id.toString()
        );
        if (mainComment) {
            setComments((prev) => [
                ...prev.filter((c) => c._id.toString() !== data._id.toString()),
            ]);
        } else {
            const updatedComments = comments.map((el) => {
                const updatedReplies = el.replies.filter(
                    (r) => r._id.toString() !== data._id.toString()
                );
                return { ...el, replies: updatedReplies };
            });
            setComments(updatedComments);
        }
    };
    const handleSubmit = () => {
        instance
            .post("/comment", {
                text: value,
                replyedCommentId,
                postId: postId,
            })
            .then((res) => {
                const updatedComments = comments.map((el) => {
                    if (el._id.toString() === replyedCommentId.toString()) {
                        return { ...el, replies: [...el.replies, res.data] };
                    }
                    return el;
                });
                setComments(updatedComments);
            });
        handleCancel();
    };
    const handleReply = () => {
        setIsReplying(true);
    };
    const handleLike = async () => {
        await instance.put(`/comment/${data._id}`);
        setData((prev) => ({
            ...prev,
            likes: prev.likes + (isLiked ? -1 : 1),
        }));
        setIsLiked(!isLiked);
    };
    return (
        <>
            <div
                className={`${s.content} ${
                    isCommentByCurrentUser ? s.active : ""
                }`}
            >
                <div className={s.avatar}>
                    <img src={data.user.avatarUrl} alt="avatar" />
                </div>
                <div className={s.info}>
                    <div className={s.name}>{data.user.fullname}</div>
                    <div className={s.text}>{data.text}</div>
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
                            <BsReply
                                className={`iconBtn iconBtn_m`}
                                onClick={handleReply}
                            />
                        </div>
                        {isCommentByCurrentUser && (
                            <div className={`${s.action} ${s.delete}`}>
                                <MdDeleteForever
                                    className={`iconBtn iconBtn_m`}
                                    onClick={handleDelete}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isReplying && <CommentInput user={user} value={value} setValue={setValue} handleSubmit={handleSubmit} handleCancel={handleCancel}/>}
        </>
    );
}

export default Comment;