import React, { useState, useRef, useEffect } from "react";
import {
    Search,
    UserCircle,
    ShoppingCart,
    Eye,
    Flame,
    Percent,
    CreditCard,
} from "lucide-react";
import { FaSteam } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "../ui/UserMenu";

const Navbar = () => {
    const { isLogin, user } = useSelector((state) => state.auth);
    const cartCount = useSelector((state) =>
        state.cart.list.reduce((sum, item) => sum + item.quantity, 0)
    );

    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    // 🔹 Click outside để đóng menu
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-[#2579f2] text-white w-full font-sans">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                {/* LOGO */}
                <Link to="/home" className="flex items-center gap-2 min-w-fit">
                    <div className="w-10 h-10 border-2 border-white rounded-full">
                        <img
                            src="https://cdn.divineshop.vn/static/b1402e84a947ed36cebe9799e47f61c2.svg"
                            className="w-full h-full p-1"
                            alt="logo"
                        />
                    </div>
                    <span className="text-xl font-bold">Divine Shop</span>
                </Link>

                {/* SEARCH */}
                <div className="grow max-w-2xl flex rounded-xl overflow-hidden border">
                    <input
                        placeholder="Tìm kiếm sản phẩm"
                        className="flex-1 px-4 py-2 text-white outline-none bg-transparent"
                    />
                    <button className="bg-[#1a5fb4] px-4">
                        <Search size={20} />
                    </button>
                </div>

                {/* USER + CART */}
                <div className="flex items-center gap-6 text-sm font-medium">
                    {/* USER */}
                    <div ref={menuRef} className="relative">
                        <button
                            onClick={() => setOpenMenu((prev) => !prev)}
                            className="flex items-center gap-2 select-none"
                        >
                            <UserCircle size={32} />
                            {isLogin && user ? (
                                <span>{user.name}</span>
                            ) : (
                                <Link to="/login">Đăng nhập / Đăng ký</Link>
                            )}
                        </button>

                        {openMenu && isLogin && user && <UserMenu user={user} />}
                    </div>

                    {/* CART */}
                    <Link to="/cart">
                        <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 hover:bg-white/10">
                            <ShoppingCart size={20} />
                            <span>Giỏ hàng</span>
                            <span className="bg-white text-[#2579f2] px-2 rounded font-bold">
                {cartCount}
              </span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* NAV BOTTOM */}
            <div className="max-w-7xl mx-auto px-4 pb-3 flex justify-between text-[13px]">
                <div className="flex gap-8">
                    <Link to="/product" className="flex gap-2">
                        <FaSteam size={18} /> Tất cả sản phẩm
                    </Link>
                    <Link className="flex gap-2">
                        <Eye size={18} /> Đã xem
                    </Link>
                    <Link className="flex gap-2">
                        <Flame size={18} /> Mua nhiều
                    </Link>
                    <Link className="flex gap-2">
                        <Percent size={18} /> Khuyến mãi
                    </Link>
                </div>

                <Link to="/topup" className="flex gap-2">
                    <CreditCard size={18} /> Hình thức thanh toán
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
