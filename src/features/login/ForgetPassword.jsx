import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getUserByEmail, resetPassword} from "../../services/apiAuth.js";
import {Mail, ShieldCheck, Lock, Timer} from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {formatTime} from "../../utils/formatTime.js";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        let timer;
        if (step === 2 && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGeneratedOtp("");
            toast.error("Mã OTP đã hết hạn!");
        }

        return () => clearInterval(timer);
    }, [step, timeLeft]);

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
                email: email,
                otp_code: code,
            };

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            toast.success("Mã xác thực đã được gửi!");
            setTimeLeft(600);
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
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div
                        className={"flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-mono transition-colors"}>
                        <Timer size={16} />
                        <span>Mã hết hạn sau: {formatTime(timeLeft)}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mã xác thực (OTP)</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                maxLength="6"
                                value={otpInput}
                                onChange={(e) => setOtpInput(e.target.value)}
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all mt-2"
                    >
                        {loading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐỔI MẬT KHẨU"}
                    </button>
                </form>
            )}

            <div className="flex gap-6 justify-center mt-8 text-center text-sm">
                <button
                    onClick={handleSendOTP}
                    className={"text-white font-semibold hover:text-blue-600 cursor-pointer"}>
                    Gửi lại mã
                </button>
                <Link to="/login" className="text-white font-semibold hover:text-blue-600 cursor-pointer">
                    Quay lại đăng nhập
                </Link>
            </div>
        </div>
    );
}