import background from "../img/pixel-art-13.webp";
import LoginForm from "../features/login/LoginForm.jsx";
import RegisterForm from "../features/login/RegisterForm.jsx";
import {useState} from "react";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden font-sans">
            <img className="absolute w-full h-full object-cover" src={background}/>
            {isLogin ? (
                <LoginForm onSwitch={() => setIsLogin(false)}/>
            ) : (
                <RegisterForm onSwitch={() => setIsLogin(true)}/>
            )}
        </div>
    );
}