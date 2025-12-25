export default function RegisterForm({onSwitch}) {
    const handleRegister = (e) => {
        e.preventDefault();
        onSwitch();
        alert("Đăng ký thành công! Vui lòng đăng nhập lại");
    };

    return (
        <div
            className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white">
            <div className="text-center mb-8">
                <span className="text-3xl font-bold tracking-tight">Tạo tài khoản</span>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Họ và tên</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transform transition-all">
                    ĐĂNG KÝ
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-gray-400">Đã có tài khoản? </span>
                <span
                    className="text-blue-400 font-semibold hover:underline cursor-pointer"
                    onClick={onSwitch}>
                    Đăng nhập tại đây
                </span>
            </div>
        </div>
    );
}