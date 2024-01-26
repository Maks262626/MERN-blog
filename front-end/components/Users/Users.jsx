import s from './Users.module.scss';

function Users({ users }) {
    return (
        <div className={s.users}>
            <div className={s.users__title}>Last Users</div>
            <div className={s.usersWrapper}>
                {users.map((user, index) => {
                    return (
                        <div className={s.user} key={index}>
                            <img
                                className={s.avatar}
                                src={
                                    user.avatarUrl
                                        ? `${user.avatarUrl}`
                                        : "https://placehold.co/50x50"
                                }
                                alt="avatar"
                            />
                            <span>{user.fullname}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Users;