import { Link, Navigate } from 'react-router-dom';
import s from './Register.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, isAuthSelector } from '../../redux/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { useRef, useState } from 'react';
import instance from '../../axios';

function Register() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);
    const inputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const avatarUrl = imageUrl ? imageUrl : "https://placehold.co/50x50";
    const handleImage = async (e) => {
        try {
            const formatData = new FormData();
            const file = e.target.files[0];
            setImageFile(file);
            formatData.append("image", file);
            const { data } = await instance.post("/upload", formatData);
            setImageUrl(data.data.image);
        } catch (err) {
            console.warn(err);
            alert("failed to load img");
        } 
    };
    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Formik
            initialValues={{ fullname: "", email: "", password: "" }}
            validationSchema={Yup.object({
                fullname: Yup.string()
                    .min(3, "at least 3 characters")
                    .required("Required"),
                email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                password: Yup.string()
                    .min(8, "Must be 8 characters at least")
                    .required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {

                if (imageFile) {
                    const formatData = new FormData();
                    formatData.append("image", imageFile);
                    await instance.post("/upload", formatData);
                }
                
                const registerData = { ...values, avatarUrl }; 
                
                const data = await dispatch(fetchRegister(registerData));
                if (!data.payload) {
                    return alert("can't register");
                }
                window.localStorage.setItem("token", data.payload.token);
                setSubmitting(false);
            }}
            validateOnChange={false}
            validateOnBlur={true}
        >
            <div className={s.register}>
                <div className={s.register__inner}>
                    <div className={s.title}>Register</div>
                    <Form className={s.form}>
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
                        <Field
                            className="input"
                            placeholder="Full name"
                            type="text"
                            name="fullname"
                        />
                        <div className={s.error}>
                            <ErrorMessage name="fullname" />
                        </div>
                        <Field
                            className="input"
                            placeholder="Email"
                            type="text"
                            name="email"
                        />
                        <div className={s.error}>
                            <ErrorMessage name="email" />
                        </div>
                        <Field
                            className="input"
                            placeholder="Password"
                            type="text"
                            name="password"
                        />
                        <div className={s.error}>
                            <ErrorMessage name="password" />
                        </div>
                        <button className="btn" type="submit">
                            Register
                        </button>
                        <Link className={s.link} to="/login">
                            Have acc? Sign in
                        </Link>
                    </Form>
                </div>
            </div>
        </Formik>
    );
}
export default Register;