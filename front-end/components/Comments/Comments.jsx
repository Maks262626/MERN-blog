import { useState } from 'react';
import s from './Comments.module.scss'; 
import Comment from './Comment';
import CommentInput from './CommentInput';
import instance from '../../axios';

function Comments({ comments, user, postId }) {
    const [data, setData] = useState(comments);
    const [openedReplies, setOpenedReplies] = useState([]);
    const [value,setValue] = useState([]);
    
    const handleShowReplies = (commentId) => {
        if (openedReplies.includes(commentId)) {
            setOpenedReplies((prev) => [...prev.filter(id => id.toString() !== commentId.toString())]);
        } else {
            setOpenedReplies(prev => [...prev,commentId]);
        }
    }
  
    const handleSubmit = () => {
        if (value.length > 3) {
            instance
                .post("/comment", { text: value, postId })
                .then((data) => {
                    setData((prev) => [...prev, data.data]);
                });
        }
    }
    const handleCancel = () => {
        setValue('');
    }
    return (
        <>
            {user && <CommentInput user={user} value={value} setValue={setValue} handleSubmit={handleSubmit} handleCancel={handleCancel} />}

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