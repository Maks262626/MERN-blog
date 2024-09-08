import { Link } from 'react-router-dom';
import s from './Header.module.scss';

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

export default HeaderNotAuth;