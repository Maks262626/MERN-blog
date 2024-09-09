import s from './Comments.module.scss'; 

function CommentInput({user,value,setValue,handleSubmit,handleCancel}) {
    return (
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
    );
}

export default CommentInput;