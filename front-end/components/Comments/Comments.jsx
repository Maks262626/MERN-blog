import { useState } from 'react';
import s from './Comments.module.scss'; 
import { FaRegHeart } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import instance from '../../axios';
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
        data.likedBy.includes(data.user._id)
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
            {isReplying && (
                <div className={s.commentReplyWrapper}>
                    <div className={s.comment__submit}>
                        <div className={s.comment__top}>
                            <img src={user.avatarUrl} alt="avatar" />
                            <input
                                value={value}
                                type="text"
                                className="input"
                                placeholder="Add Comment"
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className={s.comment__bottom}>
                            <button className="btn" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className="btn" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
function Comments({ comments, user, postId }) {
    const [data, setData] = useState(comments);
    const [value, setValue] = useState("");
    const [openedReplies, setOpenedReplies] = useState([]);
    const handleSubmit = () => {
        if (value.length > 3) {
            handleCancel();
            instance
                .post("/comment", { text: value, postId: postId })
                .then((data) => {
                    setData((prev) => [...prev, data.data]);
                });
        }
    }
    const handleCancel = () => {
        setValue("");
    }
    const handleShowReplies = (commentId) => {
        if (openedReplies.includes(commentId)) {
            setOpenedReplies((prev) => [...prev.filter(id => id.toString() !== commentId.toString())]);
        } else {
            setOpenedReplies(prev => [...prev,commentId]);
        }
    }
    return (
        <>
            {user && (
                <div className={s.comment__submit}>
                    <div className={s.comment__top}>
                        <img src={user.avatarUrl} alt="avatar" />
                        <input
                            value={value}
                            type="text"
                            className="input"
                            placeholder="Add Comment"
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                        />
                    </div>
                    <div className={s.comment__bottom}>
                        <button className="btn" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            )}

            <div>
                {data.map((comment) => {
                    return (
                        <div className={s.comment} key={comment._id}>
                            <Comment
                                comment={comment}
                                user={user}
                                replyedCommentId={comment._id}
                                comments={data}
                                postId={postId}
                                setComments={setData}
                            />
                            <div className={s.replies}>
                                {comment.replies.length > 0 && (
                                    <div
                                        className={`btn btn_outlined ${s.replies__count}`}
                                        onClick={() => {
                                            handleShowReplies(comment._id);
                                        }}
                                    >
                                        {comment.replies.length} Replies
                                    </div>
                                )}
                                {openedReplies.includes(comment._id) && (
                                    <div className={s.replyWrapper}>
                                        {comment.replies.map((reply) => {
                                            return (
                                                <Comment
                                                    comment={reply}
                                                    user={user}
                                                    replyedCommentId={
                                                        comment._id
                                                    }
                                                    comments={data}
                                                    postId={postId}
                                                    key={reply._id}
                                                    setComments={setData}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Comments;