import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { formatNumber } from "../../utils/formatNumber";

export default function BankModal({ isOpen, onClose, onConfirm, amount }) {
  // State quản lý thông tin thẻ
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
  });

  // Reset form mỗi khi on-off modal
  useEffect(() => {
    if (!isOpen) {
      setFormData({ cardNumber: "", expiryDate: "", cardHolder: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Kiểm tra điều kiện để bật nút "Tiếp theo"
  // 1. Số thẻ (thường là 16 số)
  // 2. Ngày phát hành (đủ ký tự MM/YY)
  // 3. Tên chủ thẻ (không để trống)
  const isFormValid =
    formData.cardNumber.replace(/\s/g, "").length >= 12 &&
    formData.expiryDate.length === 5 &&
    formData.cardHolder.trim().length > 1;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative z-10 w-full max-w-105 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-[#2579f2] p-4 flex justify-between items-center text-white">
          <div className="flex flex-col">
            <span className="text-md opacity-80">Giá trị cần thanh toán</span>
            <span className="font-bold text-lg">{formatNumber(amount)}</span>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer hover:bg-gray-200/20 rounded-2xl"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div
            className="bg-linear-to-br from-slate-100 to-slate-300 h-44 rounded-xl relative 
          p-6 shadow-inner border border-white/50"
          >
            <div className="flex justify-between items-start">
              <span className="text-slate-500 font-mono tracking-widest">
                {formData.cardNumber || "•••• •••• •••• ••••"}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-widest text-slate-700 uppercase">
                {formData.cardHolder || "NGUYEN VAN A"}
              </p>
            </div>
            <div className="absolute bottom-6 left-6 flex items-center justify-around">
              <div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">
                    Ngày Phát Hành
                  </p>
                  <p className="text-slate-500 font-mono tracking-widest">
                    {formData.expiryDate || "••/••"}
                  </p>
                </div>
                <span className="absolute -bottom-2.5  -right-50">
                  <img src="public/payment_atm_logo.png" />
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-blue-600">
                Số Thẻ
              </label>
              <input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="Ex: 9704 0000 **** 0018"
                className="w-full border-b-2 border-gray-200 p-2 outline-none 
                focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-600">
                Ngày Phát Hành (MM/YY)
              </label>
              <input
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-600">
                Tên Chủ Thẻ (Có Dấu Cách)
              </label>
              <input
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                placeholder="Ex: NGUYEN VAN A"
                className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-blue-500 transition-colors uppercase"
              />
            </div>
          </div>

          <button
            disabled={!isFormValid}
            onClick={onConfirm}
            className={`w-full py-3 rounded-md font-bold transition-all shadow-lg 
              ${
                isFormValid
                  ? "bg-[#2579f2] text-white hover:bg-blue-700 active:scale-[0.98]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
}
