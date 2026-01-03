import { useState } from "react";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { update } from "../../redux/authSlice.js";
import { updateProfile } from "../../services/apiAuth";

import { createTransaction } from "../../services/apiProfile.js";

import BankModal from "./BankModal.jsx";

function TopupItem({ item, isSelected, isDimmed, onSelect, isLogin, user }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State quản lý Modal

  async function handleDeposit() {
    const depositAmount = Number(amount);

    // Đóng modal trước khi chạy toast
    setIsModalOpen(false);

    const savePromise = async () => {
      const newBalance = Number(user.balance) + depositAmount;
      const updatedUser = await updateProfile(user.id, { balance: newBalance });

      const newTransaction = {
        id_user: user.id,
        time: new Date().toLocaleString("sv-SE"),
        transaction_type: "DEPOSIT",
        desc: `Nạp tiền qua ${item.name}`,
        amount: depositAmount,
      };
      await createTransaction(newTransaction);
      dispatch(update(updatedUser));
      setAmount("");
      return updatedUser;
    };

    await toast.promise(savePromise(), {
      loading: "Đang xác thực thẻ...",
      success: "Nạp tiền thành công!",
      error: (err) => `Lỗi: ${err.message}`,
    });
  }

  // Hàm mở Modal kiểm tra tiền trước khi hiện
  const handleOpenBankModal = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ!");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="transition-all duration-200">
        <div
          onClick={() => onSelect(item.id)}
          className={`p-3 flex items-center gap-4 border-[#9ca3af40] border-2 border-b-0 cursor-pointer
          ${isDimmed ? "opacity-50 grayscale-[0.3]" : "opacity-100"} 
          ${isSelected ? "bg-gray-50" : ""}
        `}
        >
          <div>
            <img className="h-10 w-10" src={item.img} alt={item.name} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-md font-bold">{item.name}</p>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        </div>

        {isSelected && (
          <div className="p-3 border-[#9ca3af40] border-2 border-t-0 bg-white">
            {!isLogin ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Vui lòng đăng nhập để tiếp tục thanh toán.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium">
                  Đăng nhập
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <input
                  className="py-2 px-6 border-[#9ca3af40] border-2 rounded-md outline-none focus:border-blue-500 w-64"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder="Nhập số tiền muốn nạp"
                />
                <button
                  onClick={handleOpenBankModal}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
                >
                  Nạp Dcoin
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Gọi Modal ở đây */}
      <BankModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeposit} // Gọi hàm nạp tiền khi nhấn Tiếp theo
        amount={amount}
      />
    </>
  );
}

export default TopupItem;
