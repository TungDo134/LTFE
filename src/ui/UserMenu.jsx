import { Link } from "react-router-dom";
import { LogOut, User, History, Heart, Wallet } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function UserMenu({ user }) {
    const dispatch = useDispatch();

    return (
        <div className="absolute right-0 top-12 w-56 bg-white text-gray-800 rounded-md shadow-lg border z-50">
            <div className="px-4 py-3 border-b">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <Link
                to="/wallet"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
                <Wallet size={16} /> Số dư tài khoản
            </Link>

            <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
                <User size={16} /> Quản lý tài khoản
            </Link>

            <Link
                to="/OrderHistoryPage"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
                <History size={16} /> Lịch sử đơn hàng
            </Link>

            <Link
                to="/favorites"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
                <Heart size={16} /> Sản phẩm yêu thích
            </Link>

            <button
                onClick={() => dispatch(logout())}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-500"
            >
                <LogOut size={16} /> Đăng xuất
            </button>
        </div>
    );
}

export default UserMenu;
