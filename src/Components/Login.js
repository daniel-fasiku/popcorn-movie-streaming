import "../styles/login.css";
import logo from "../assets/logo.jpeg";
import { Formik, Form, useField } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from 'yup';
import { Button } from "../widgets/LoginButton";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";  // Import the translation hook
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase';

const initialValues = {
    email: "",
    password: ""
}

const Textfield = ({ type, label, name }) => {
    const [field, meta] = useField(name);
    const { t } = useTranslation();  // Use the translation hook

    return (
        <div className="input-holder-holder">
            <div className="input-holder w-300px">
                <input
                    type={type}
                    className="form-control"
                    placeholder={t(label)}
                    name={name}
                    {...field}
                />
                <label className="input-label">{t(label)}</label>
            </div>


            {meta.error && meta.touched && <p className="error">{meta.error}</p>}
        </div>
    )
}

const validationSchema = Yup.object({
    email: Yup.string().required("Email is required")
        .email("Invalid email address"),
    password: Yup.string().required("Password is required")
})

const ForgotPasswordModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState(" ");
    const [successMessage, setSuccessMessage] = useState("");  // State to hold success message

    const { t } = useTranslation();  // Use the translation hook

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccessMessage(t("An email has been sent successfully to your mail"));
            })
            .catch((error) => {
                setSuccessMessage(t("User not found"));
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <div className="modal-forgot">
            <div className="modal-content-forgot">
                <div className="modal-header-forgot">
                    <h2 className={`${successMessage === "" ? "header-2-forgot-success" : 'hidden'}`}>{t('Forgot Password')}</h2>
                </div>
                {successMessage === "" ? (
                    <form onSubmit={handleSubmit} className="styled-form">
                        <div>
                            <input type="email" placeholder={t("Enter your email")} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="submit-button-forgot" onClick={handleSubmit}>
                            <span>{t("Submit")}</span>
                        </div>
                        <a className="close-forgot" onClick={handleClose} type="button">{t("Cancel")}</a>
                    </form>  // Display success message
                ) : (
                    <p style={{ textAlign: "center" }}>{successMessage}</p>
                )}
            </div>
        </div>
    );
};

const LoginForm = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();  // Use the translation hook

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const onLogin = (values) => {
        // e.preventDefault();
        console.log(email);
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg("Invalid credentials");
                console.log(errorCode, errorMessage);
            });

    }

    // const onSubmit = useCallback((values) => {
    //     // navigate("/home");
    // }, [navigate]);
    const onSubmit = (values) => {
        console.log(values);
        onLogin(values);
    };

    const handleForgotPassword = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCreateAccount = () => {
        navigate("/createaccount");
    };

    return (
        <>
            <Formik initialValues={initialValues}
                onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form className="mt-48">
                        <Textfield type="text" label="Email Address" name="email" value={email} onChange={(e) => setEmail(props.email)} />
                        <Textfield type="password" label="Password" name="password" value={password} onChange={(e) => setPassword(props.password)} />
                        <p style={{ color: "red", fontSize: 15 }}>{errorMsg}</p>
                        <Button
                            text={t("Login")}
                            extraClass="mt-32"
                            type="tetiary"
                            disabled={!props.isValid || (!props.touched.email && !props.touched.password)}
                            isFull />
                    </Form>
                )}
            </Formik>
            <div className="forgot-password">
                <a onClick={handleForgotPassword}>{t("Forgot Password?")}</a>
            </div>
            <div className="create-account">
                <a type="button" onClick={handleCreateAccount}>{t("Create Account")}</a>
            </div>
            <ForgotPasswordModal show={showModal} handleClose={handleCloseModal} />
        </>
    );
};

export default function Login() {
    useEffect(() => {
        document.body.classList.add("login-page");
        return () => {
            document.body.classList.remove("login-page");
        };
    }, []);

    return (
        <div className="login-body flex-center">
            <div className="login-holder flex-column-center">
                <img src={logo} className="login-logo" alt="viio logo" />

                <LoginForm />
            </div>
        </div>
    );
}
