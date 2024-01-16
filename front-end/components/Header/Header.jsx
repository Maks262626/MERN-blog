import { useEffect, useState } from 'react';
import s from './Header.module.scss';
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector, logout, userSelector } from '../../redux/auth';
import { IoMdClose } from "react-icons/io";
import { useMediaPredicate } from "react-media-hook";

function HeaderAuth({ user, handleClickLogOut }) {
    return (
        <>
            <button
                className={`btn btn_m ${s.logout}`}
                onClick={handleClickLogOut}
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

function HeaderNotAuth() {
    return (
        <>
            <Link className={`btn btn_outlined btn_m ${s.login}`} to="/login">
                Login
            </Link>
            <Link className={`btn btn_m ${s.register}`} to="/register">
                Register
            </Link>
        </>
    );
}
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

function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);
    const user = useSelector(userSelector);
    const [isBurger, setIsBurger] = useState(false);
    const [mediaBurgerWidth, setMediaBurgerWidth] = useState(768); 
    const mediaBurger = useMediaPredicate(`(max-width: ${mediaBurgerWidth}px)`);
    
    useEffect(() => {
        setMediaBurgerWidth(isAuth ? 768 : 400);
    }, [isAuth]);

    const handleClickLogOut = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    }

    const [theme, setTheme] = useState("dark");
    document.querySelector("body").setAttribute("data-theme", theme);
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }



    const handleClick = (e) => {
        e.stopPropagation()
        console.log(e,isBurger, !e.target.className.baseVal?.includes("iconBtn"));
        if (isBurger && !e.target.className.baseVal?.includes('iconBtn') && !e.target.className?.includes(`${s.content}`)) {
            setIsBurger(false);
        }
    }
    return (
        <header className={`${s.header} ${s.active}`}>
            <Link className={s.logo} to="/">
                Article<span>hub</span>
            </Link>
            {isAuth && <HeaderMenu />}

            <div className={s.actions}>
                <div className={s.themeSwitch} onClick={toggleTheme}>
                    {theme === "light" ? (
                        <MdOutlineNightlight className="iconBtn" />
                    ) : (
                        <MdOutlineLightMode className="iconBtn" />
                    )}
                </div>
                {!isAuth && <HeaderNotAuth />}
                {isAuth && (
                    <HeaderAuth
                        user={user}
                        handleClickLogOut={handleClickLogOut}
                    />
                )}
            </div>
            {mediaBurger && (
                <div
                    className={`${s.burgerMenu} ${isBurger ? s.active : ""}`}
                    onClick={handleClick}
                >
                    <div
                        className={`${s.burger}`}
                        onClick={() => {
                            setIsBurger(!isBurger);
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={`${s.content} ${isBurger ? s.active : ""}`}>
                        <IoMdClose
                            className={`iconBtn ${s.close}`}
                            onClick={() => {
                                setIsBurger(false);
                            }}
                        />
                        <div className={s.themeSwitch} onClick={toggleTheme}>
                            {theme === "light" ? (
                                <MdOutlineNightlight className="iconBtn" />
                            ) : (
                                <MdOutlineLightMode className="iconBtn" />
                            )}
                        </div>
                        {!isAuth && <HeaderNotAuth />}
                        {isAuth && <HeaderMenu />}
                        {isAuth && (
                            <HeaderAuth
                                user={user}
                                handleClickLogOut={handleClickLogOut}
                            />
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
