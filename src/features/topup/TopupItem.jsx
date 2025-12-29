import { useState } from "react";
import { update } from "../../redux/authSlice.js";

import { updateProfile } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function TopupItem({ item, isSelected, isDimmed, onSelect, isLogin, user }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  // Hàm xử lý nạp tiền
  async function handleDeposit() {
    const depositAmount = Number(amount);
    if (!amount || depositAmount <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ!");
      return;
    }

    const savePromise = async () => {
      // Tính toán số dư mới (ép kiểu)
      const newBalance = Number(user.balance) + depositAmount;
      const updatedUser = await updateProfile(user.id, { balance: newBalance });
      dispatch(update(updatedUser));

      // Reset input sau khi nạp thành công
      setAmount("");

      return updatedUser;
    };

    // 3. Thực thi và hiển thị thông báo
    await toast.promise(savePromise(), {
      loading: "Đang xử lý giao dịch...",
      success: "Nạp tiền thành công!",
      error: (err) => `Lỗi: ${err.message || "Giao dịch thất bại"}`,
    });
  }

  return (
    <div className="transition-all duration-200">
      <div
        onClick={() => onSelect(item.id)}
        className={`p-3 flex items-center gap-4 border-[#9ca3af40] border-2 border-b-0 cursor-pointer
          ${isDimmed ? "opacity-50 grayscale-[0.3]" : "opacity-100"} 
          ${isSelected ? "bg-gray-50" : ""}
        `}
      >
        <div>
          <img
            className="block h-10 w-10 align-middle"
            src={item.img}
            alt={item.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-md font-bold">{item.name}</p>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
      </div>

      {/* Toggle thẻ */}
      {isSelected && (
        <div className="p-3 border-[#9ca3af40] border-2 border-t-0 bg-white flex flex-col items-start gap-4">
          {/* Check login */}
          {!isLogin ? (
            <div>
              {/*  CHƯA đăng nhập */}
              <p className="text-sm text-gray-600">
                Vui lòng đăng nhập để tiếp tục thanh toán.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium">
                Đăng nhập để tiếp tục
              </button>
            </div>
          ) : (
            <div>
              {/* ĐÃ đăng nhập */}
              <div className=" flex items-center gap-4  cursor-pointer">
                <input
                  className="py-2 px-6 border-[#9ca3af40] border-2 rounded-md"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder="Nhập số tiền muốn nạp"
                />
                <button
                  onClick={handleDeposit}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium"
                >
                  Nạp Dcoin
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TopupItem;
