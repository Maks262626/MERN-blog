import { useEffect, useState } from 'react';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthSelector, userSelector } from '../../redux/auth';
import { useMediaPredicate } from "react-media-hook";
import HeaderMenu from './HeaderMenu';
import HeaderNotAuth from './HeaderNotAuth';
import HeaderAuth from './HeaderAuth';
import Theme from './Theme';
import BurgerMenu from './BurgerMenu';

function Header() {
    const isAuth = useSelector(isAuthSelector);
    const user = useSelector(userSelector);
    const [mediaBurgerWidth, setMediaBurgerWidth] = useState(768); 
    const mediaBurger = useMediaPredicate(`(max-width: ${mediaBurgerWidth}px)`);
    
    useEffect(() => {
        setMediaBurgerWidth(isAuth ? 768 : 400);
    }, [isAuth]);
    
    return (
        <header className={`${s.header} ${s.active}`}>
            <Link className={s.logo} to="/">
                Article<span>hub</span>
            </Link>
            {isAuth && <HeaderMenu />}
            <div className={s.actions}>
                <Theme/>
                {!isAuth && <HeaderNotAuth />}
                {isAuth && <HeaderAuth user={user}/>}
            </div>
            {mediaBurger && <BurgerMenu isAuth={isAuth} user={user}/>}
        </header>
    );
}

export default Header;
