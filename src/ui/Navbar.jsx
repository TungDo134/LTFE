import React from "react";
import {
    Search,
    UserCircle,
    ShoppingCart,
    Eye,
    Flame,
    Percent,
    CreditCard,
} from "lucide-react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {logout} from "../redux/authSlice.js";

const Navbar = () => {
    const {isLogin, user} = useSelector((state) => state.auth);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()

    return (
        <nav className="bg-[#2579f2] text-white w-full font-sans ">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Link
                    to={"/home"}
                    className="flex items-center gap-2 min-w-fit cursor-pointer group">
                    <div className="w-10 h-10 border-2 border-white rounded-full">
                        <img
                            loading="lazy"
                            src="https://cdn.divineshop.vn/static/b1402e84a947ed36cebe9799e47f61c2.svg"
                            className="w-full h-full p-1"
                            alt="logo"
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tight group-hover:text-blue-100 transition-colors">
                        Divine Shop
                    </span>
                </Link>
                <div className="flex-grow max-w-2xl flex border-2 border-white-500 border-line rounded-xl p-1">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm"
                        className="w-full px-4 py-2 rounded-l-md text-white focus:outline-none"
                    />
                    <button className="bg-[#1a5fb4] px-4 py-2 rounded-r-md hover:bg-blue-800 transition">
                        <Search size={20}/>
                    </button>
                </div>

                <div className="flex items-center gap-6 text-sm font-medium">
                    <div className="flex items-center justify-center gap-2 cursor-pointer relative group min-w-[200px]"
                         onMouseEnter={() => setShowMenu(true)}
                         onMouseLeave={() => setShowMenu(false)}>
                        {isLogin && user ? (
                            <>
                                {user.avt ? (
                                    <img
                                        src={user.avt} alt={user.name}
                                        className="w-8 h-8 rounded-full "/>
                                ) : (
                                    <UserCircle size={32} strokeWidth={1.5}/>
                                )}
                                <span className="font-medium">{user.name}</span>
                                {showMenu && (
                                    <div
                                        className="absolute top-full mt-2 w-48 py-2 z-10 bg-white rounded-lg shadow-xl text-gray-800">
                                        <div className="absolute -top-3 h-3 w-full bg-transparent"></div>
                                        <Link to={"profile"}
                                              className="block px-4 py-2 hover:bg-blue-50 transition-colors">
                                            Tài khoản của tôi
                                        </Link>
                                        <Link to={""}
                                              className="block px-4 py-2 hover:bg-blue-50 transition-colors">
                                            Đơn mua
                                        </Link>
                                        <hr className="my-1 border-gray-100"/>
                                        <button
                                            onClick={() => dispatch(logout())}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2">
                                <UserCircle size={32} strokeWidth={1.5}/>
                                <span className="font-medium">Đăng nhập / Đăng ký</span>
                            </Link>
                        )}
                    </div>

                    <Link to="/cart">
                        <div
                            className="flex items-center gap-2 border border-white rounded-md px-3 py-1.5 cursor-pointer hover:bg-white/10">
                            <ShoppingCart size={20}/>
                            <span>Giỏ hàng</span>
                            <span className="bg-white text-[#2579f2] px-1.5 rounded-sm font-bold ml-1">
                                0
                            </span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-3 flex justify-between items-center text-[13px] font-medium">
                <div className="flex items-center gap-8">
                    <Link to={""} className="flex items-center gap-2 hover:opacity-80">
                        <Eye size={18}/> Sản phẩm bạn vừa xem
                    </Link>
                    <Link to={""} className="flex items-center gap-2 hover:opacity-80">
                        <Flame size={18}/> Sản phẩm mua nhiều
                    </Link>
                    <Link to={""} className="flex items-center gap-2 hover:opacity-80">
                        <Percent size={18}/> Sản phẩm khuyến mại
                    </Link>
                </div>

                <div className="flex items-center gap-8">
                    <Link to={""} className="flex items-center gap-2 hover:opacity-80">
                        <CreditCard size={18}/> Hình thức thanh toán
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
