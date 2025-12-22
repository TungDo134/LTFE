import React from "react";
import { Search, UserCircle, ShoppingCart, Eye, Flame, Percent, CreditCard } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-[#2579f2] text-white w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-fit cursor-pointer group">
          <div className="w-10 h-10">
            <img
              loading="lazy"
              src="https://cdn.divineshop.vn/static/b1402e84a947ed36cebe9799e47f61c2.svg"
              className="w-full h-full object-contain"
              alt="logo"
            />
          </div>

          <span className="text-xl font-bold tracking-tight group-hover:text-blue-100 transition-colors">
            Divine Shop
          </span>
        </div>
        <div className="flex-grow max-w-2xl flex">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
          />
          <button className="bg-[#1a5fb4] px-4 py-2 rounded-r-md hover:bg-blue-800 transition">
            <Search size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <UserCircle size={32} strokeWidth={1.5} />
            <span>Đăng nhập / Đăng ký</span>
          </div>

          <div className="flex items-center gap-2 border border-white rounded-md px-3 py-1.5 cursor-pointer hover:bg-white/10">
            <ShoppingCart size={20} />
            <span>Giỏ hàng</span>
            <span className="bg-white text-[#2579f2] px-1.5 rounded-sm font-bold ml-1">0</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-3 flex justify-between items-center text-[13px] font-medium">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 hover:opacity-80">
            <Eye size={18} /> Sản phẩm bạn vừa xem
          </a>
          <a href="#" className="flex items-center gap-2 hover:opacity-80">
            <Flame size={18} /> Sản phẩm mua nhiều
          </a>
          <a href="#" className="flex items-center gap-2 hover:opacity-80">
            <Percent size={18} /> Sản phẩm khuyến mại
          </a>
        </div>

        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 hover:opacity-80">
            <CreditCard size={18} /> Hình thức thanh toán
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
