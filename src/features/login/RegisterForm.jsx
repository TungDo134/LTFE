import {useState} from "react";
import {register, checkExisted} from "../../services/apiAuth.js";
import {Info} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function RegisterForm({onSwitch}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }
        setLoading(true);
        try {
            const existingUsers = await checkExisted(email);

            if (existingUsers.length > 0) {
                setError("Email đã được đăng ký!");
                setLoading(false);
                return;
            }

            const newUser = {
                avt: "https://cdn.divineshop.vn/image/catalog/icon/avatar-khach-hang-2-52544.png?hash=1649933269",
                name,
                username: name,
                email,
                pwd: password,
                balance: "0",
                used: "0"
            };

            await register(newUser);
            toast.success("Đăng ký thành công! Đang chuyển sang đăng nhập.");
            setTimeout(() => {
                onSwitch();
            }, 1500);

            onSwitch();
        } catch (err) {
            setError("Có lỗi xảy ra, vui lòng thử lại sau.");
            console.log("Register error:", err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white">
            <div className="text-center mb-8">
                <span className="text-3xl font-bold tracking-tight">Tạo tài khoản</span>
            </div>

            {error && (
                <div
                    className="mb-5 p-3 bg-red-500/30 border border-red-500/80 rounded-lg flex items-center gap-2 text-white text-sm">
                    <Info size={18}/>
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Họ và tên</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                    />
                </div>

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

                <div>
                    <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transform transition-all">
                    {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-gray-400">Đã có tài khoản? </span>
                <Link to="/login" className="text-blue-400 font-semibold hover:underline">
                    Đăng nhập tại đây
                </Link>
            </div>
        </div>
    );
}