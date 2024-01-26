import { useDispatch, useSelector } from "react-redux";
import { fetchAvatar, userSelector } from "../../redux/auth";
import s from './User.module.scss';
import { useEffect, useRef, useState } from "react";
import instance from "../../axios";
import Preloader from "../../components/Preloader/Preloader";

function User() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user) {
            setLoading(false);
        }    
    },[user])
    const handleImage = async (e) => {
        try {
            const formatData = new FormData();
            const file = e.target.files[0];
            formatData.append("image", file);
            const { data } = await instance.post("/upload", formatData);
            dispatch(fetchAvatar({ url: data.data.image }));
        } catch (err) {
            console.warn(err);
            alert("failed to load img");
        } 
    };


    const avatarUrl = user?.avatarUrl ? `${user.avatarUrl}` : "https://placehold.co/50x50";
    if (loading) {
        return <Preloader/>
    }
    return (
        <div className={s.user}>
            <div className={s.container}>
                <div className={s.title}>User Info</div>
                <div className={s.user__inner}>
                    <div
                        className={s.avatar}
                        onClick={() => {
                            inputRef.current.click();
                        }}
                    >
                        <img src={avatarUrl} alt="avatar" />
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleImage}
                            hidden
                        />
                    </div>
                    <div className={s.name}>{user.fullname}</div>
                </div>
            </div>
        </div>
    );
}

export default User;