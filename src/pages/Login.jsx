import background from "../img/pixel-art-13.webp";
import LoginForm from "../features/login/LoginForm.jsx";
import RegisterForm from "../features/login/RegisterForm.jsx";
import ForgetPassword from "../features/login/ForgetPassword.jsx";
import { Link, useNavigate } from "react-router-dom";


export default function Login({isRegister, isForget}) {
    const navigate = useNavigate();

    return (
        <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden font-sans">
            <img className="absolute w-full h-full object-cover" src={background}/>

            {isRegister ? (
                <RegisterForm onSwitch={() => navigate("/login")}/>
            ) : isForget ? (
                <ForgetPassword onBack={() => navigate("/login")}/>
            ) : (
                <LoginForm
                    onSwitch={() => navigate("/register")}
                    onForget={() => navigate("/forgot-password")}
                />
            )}
        </div>
    );
}