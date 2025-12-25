import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice.js";
import {getUser} from "../../services/apiAuth.js";
import {Info} from "lucide-react"

export default function LoginForm({onSwitch}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const users = await getUser(email, password);
            if (users && users.length > 0) {
                const user = users[0];
                delete user.pwd;
                dispatch(login(user));
                navigate("/home");
            } else {
                setError("Email hoặc mật khẩu không chính xác!");
            }
        } catch (err) {
            setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau!");
            console.error("Login Error:", err);
        }
    };

    return (
        <div
            className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold ">Chào mừng trở lại</h2>
                <p className="text-gray-300 mt-2 text-sm">Vui lòng đăng nhập để tiếp tục</p>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-500/30 border border-red-500/80 rounded-lg flex items-center gap-2 text-white/90 text-sm">
                   <Info/>
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                    />
                </div>

                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded bg-white/20 border-white/30"/>
                        <span>Ghi nhớ tôi</span>
                    </label>
                    <Link to={""} className="hover:text-blue-400 transition-colors">Quên mật khẩu?</Link>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transform transition-all">
                    ĐĂNG NHẬP
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-gray-400">Chưa có tài khoản? </span>
                <span className="text-blue-400 font-semibold cursor-pointer hover:underline"
                      onClick={onSwitch}>
                            Đăng ký ngay
                    </span>
            </div>
        </div>
    )
}