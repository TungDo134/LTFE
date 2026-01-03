import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getUserByEmail, resetPassword} from "../../services/apiAuth.js";
import {Mail, ShieldCheck, Lock} from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await getUserByEmail(email);
            if (!user) {
                toast.error("Email này không tồn tại!");
                return;
            }

            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(code);

            const templateParams = {
                to_email: email,
                otp_code: code,
                user_name: user.username || "khách hàng",
            };

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            toast.success("Mã xác thực đã được gửi!");
            setStep(2);
        } catch (error) {
            console.log(error)
            toast.error("Lỗi gửi mail!");
        } finally {
            setLoading(false);
        }
    };


    const handleFinalSubmit = async (e) => {
        e.preventDefault();

        if (otpInput !== generatedOtp) {
            toast.error("Mã OTP không đúng!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu không khớp!");
            return;
        }

        setLoading(true);
        try {
            await resetPassword(email, newPassword);
            toast.success("Đổi mật khẩu thành công!");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold ">Quên mật khẩu</h2>
                <p className="text-gray-300 mt-2 text-sm">
                    {step === 1 ? "Nhập email để nhận mã xác thực" : "Xác thực OTP và đặt mật khẩu mới"}
                </p>
            </div>

            {step === 1 && (
                <form onSubmit={handleSendOTP} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email đăng ký</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                placeholder="example@gmail.com"
                            />
                            <Mail className="absolute right-3 top-3.5 opacity-40" size={18}/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all"
                    >
                        {loading ? "ĐANG GỬI..." : "GỬI MÃ XÁC THỰC"}
                    </button>
                </form>
            )}


            {step === 2 && (
                <form onSubmit={handleFinalSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Mã xác thực (OTP)</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                maxLength="6"
                                value={otpInput}
                                onChange={(e) => setOtpInput(e.target.value)}
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-center text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="000000"
                            />
                            <ShieldCheck className="absolute right-3 top-3.5 opacity-40" size={18}/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute right-3 top-3.5 opacity-40" size={18}/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all mt-2"
                    >
                        {loading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐỔI MẬT KHẨU"}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                        Sai email? <span className="text-blue-400 cursor-pointer hover:underline"
                                         onClick={() => setStep(1)}>Quay lại</span>
                    </p>
                </form>
            )}

            <div className="mt-8 text-center text-sm">
                <Link to="/login" className="text-blue-400 font-semibold hover:underline">
                    Quay lại đăng nhập
                </Link>
            </div>
        </div>
    );
}