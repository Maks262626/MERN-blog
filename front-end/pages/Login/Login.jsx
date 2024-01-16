import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import s from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, isAuthSelector } from "../../redux/auth";
import { Navigate } from "react-router-dom";


function Login() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);
    if (isAuth) {
        return <Navigate to='/'/>
    }
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                password: Yup.string()
                    .min(8, "Must be 8 characters at least")
                    .required("Required"),
            })}
            onSubmit={async(values, { setSubmitting }) => {
                const data = await dispatch(fetchUserData(values));
                if(!data.payload){
                    return alert("can't login")
                }
                window.localStorage.setItem('token', data.payload.token);
                setSubmitting(false);
            }}
            validateOnChange={false}
            validateOnBlur={true}
        >
            <div className={s.login}>
                <div className={s.login__inner}>
                    <div className={s.title}>Login</div>
                    <Form className={s.form}>
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
                            Login
                        </button>
                    </Form>
                </div>
            </div>
        </Formik>
    );
}
export default Login;
