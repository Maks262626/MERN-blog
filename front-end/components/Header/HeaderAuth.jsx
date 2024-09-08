import { Link } from 'react-router-dom';
import s from './Header.module.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth';

function HeaderAuth({ user }) {
    const dispatch = useDispatch();
    return (
        <>
            <button
                className={`btn btn_m ${s.logout}`}
                onClick={()=>{dispatch(logout())}}
            >
                Log out
            </button>
            <Link className={s.user} to="/user">
                {user?.avatarUrl ? (
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
            </Link>
        </>
    );
}

export default HeaderAuth;