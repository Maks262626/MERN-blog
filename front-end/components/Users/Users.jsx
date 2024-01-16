import s from './Users.module.scss';

function Users({ users }) {
    return (
        <div className={s.users}>
            <div className={s.users__title}>Last Users</div>
            <div className={s.usersWrapper}>
                {users.map((user, index) => {
                    return (
                        <div className={s.user} key={index}>
                            {user.avatarUrl ? (
                                <img
                                    className={s.avatar}
                                    src={`${user.avatarUrl}`}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className={s.avatar}
                                    src={"https://placehold.co/50x50"}
                                    alt=""
                                />
                            )}
                            <span>{user.fullname}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Users;