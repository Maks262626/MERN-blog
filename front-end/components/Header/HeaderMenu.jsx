import { Link } from 'react-router-dom';
import s from './Header.module.scss';

function HeaderMenu() {
    return (
        <div className={s.menu}>
            <Link to="/addpost" className={s.menu__el}>
                Post Article
            </Link>
            <Link to="/my-posts" className={s.menu__el}>
                My Posts
            </Link>
            <Link to="/likes" className={s.menu__el}>
                My Likes
            </Link>
        </div>
    );
}

export default HeaderMenu;