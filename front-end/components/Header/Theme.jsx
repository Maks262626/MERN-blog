import { useState } from "react";
import s from './Header.module.scss';
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

function Theme() {
    const [theme, setTheme] = useState("dark");
    document.querySelector("body").setAttribute("data-theme", theme);
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    return (
        <div className={s.themeSwitch} onClick={toggleTheme}>
            {theme === 'light' ? (
                <MdOutlineNightlight className="iconBtn" />
            ) : (
                <MdOutlineLightMode className="iconBtn" />
            )}
        </div>
    );
}

export default Theme;