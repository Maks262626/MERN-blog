import { useState } from 'react';
import s from './Header.module.scss';
import { IoMdClose } from "react-icons/io";
import HeaderAuth from './HeaderAuth';
import HeaderMenu from './HeaderMenu';
import HeaderNotAuth from './HeaderNotAuth';
import Theme from './Theme';


function BurgerMenu({isAuth,user}) {
    const [isBurger, setIsBurger] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation()
        if (isBurger && !e.target.className.baseVal?.includes('iconBtn') && !e.target.className?.includes(`${s.content}`)) {
            setIsBurger(false);
        }
    }

    return (
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
            <Theme/>
            {!isAuth && <HeaderNotAuth />}
            {isAuth && <HeaderMenu />}
            {isAuth && <HeaderAuth user={user} />}
        </div>
    </div>
    );
}

export default BurgerMenu;