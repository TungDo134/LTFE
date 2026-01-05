import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { LogIn, ArrowLeft } from "lucide-react";

export default function LoginRequired () {
    const { isLogin } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (isLogin) {
        return <Outlet />;
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="max-w-md w-full bg-white border border-gray-100 shadow-xl rounded-2xl p-8 text-center">
                {/* Icon minh họa */}
                <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LogIn size={40} className="text-yellow-600" />
                </div>

                {/* Nội dung thông báo */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Dừng lại một chút!
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Bạn cần đăng nhập tài khoản để có thể xem nội dung này và sử dụng đầy đủ các tính năng của cửa hàng.
                </p>

                {/* Nút điều hướng */}
                <div className="space-y-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                        <LogIn size={18} /> Đăng nhập ngay
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} /> Quay lại trang chủ
                    </button>
                </div>

                <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest font-medium">
                    Divine Shop Security
                </p>
            </div>
        </div>
    );
};

