import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/orderSlice";
// import { resetCart} from "../../redux/cartSlice";
import { clearCartAndSync } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { applyVoucher} from "../../redux/voucherSlice";
import { clearVoucher } from "../../redux/voucherSlice";

function CheckoutPanel() {
  // ================= STATE =================
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showVoucher, setShowVoucher] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [voucherCode, setVoucherCode] = useState("");
  const { voucher, error } = useSelector(state => state.voucher);


  const navigate = useNavigate();

  // ================= DATA =================
  const selectedItems = useSelector((state) =>
    state.cart.items.filter((i) => i.selected)
  );

  if (selectedItems.length === 0) return null;

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
    const discount = voucher
        ? voucher.type === "percent"
            ? Math.min((total * voucher.value) / 100, voucher.maxDiscount || Infinity)
            : voucher.value
        : 0;

    const finalTotal = Math.max(total - discount, 0);

    const handleApplyVoucher = () => {
        if (!voucherCode.trim()) return;
        dispatch(applyVoucher(voucherCode));
    };


    // ================= HANDLER =================\
  const handleConfirmPayment = async () => {
    // Thêm async
    if (!email) {
      alert("Vui lòng nhập email xác nhận");
      return;
    }

    try {
      // Đợi đơn hàng tạo xong trên Server
      await dispatch(
        createOrder({
          userId: user.id,
          items: selectedItems,
          total: finalTotal,
        })
      ).unwrap();
      await dispatch(clearCartAndSync()).unwrap();
      dispatch(clearVoucher());

      alert("Thanh toán thành công!");

      setShowConfirmModal(false);
      setEmail("");

      // Chuyển trang khi đơn hàng đã lưu xong
      navigate("/send-mail");
    } catch (err) {
      alert("Lỗi thanh toán: " + err.message);
    }
  };




    return (
    <>
      {/* ================= PANEL ================= */}
      <div className="w-full max-w-sm border rounded-md p-4 bg-white space-y-4">
        {/* ========== CHỌN PHƯƠNG THỨC ========== */}
        {!paymentMethod && (
          <>
            {/* OPTIONS */}
            <div className="space-y-2 text-sm">
              <button
                onClick={() => setShowReferral(!showReferral)}
                className="flex justify-between w-full"
              >
                <span className = "cursor-pointer">Bạn có mã giới thiệu?</span>
                <span>""</span>
              </button>
              {showReferral && (
                <input
                  placeholder="Nhập mã giới thiệu"
                  className="w-full border rounded px-3 py-1 text-sm"
                />
              )}

              <button
                onClick={() => setShowVoucher(!showVoucher)}
                className="flex justify-between w-full"
              >
                <span className = "cursor-pointer">Bạn có mã ưu đãi?</span>
                <span>%</span>
              </button>
                {showVoucher && (
                    <div className="flex gap-2">
                        <input
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            placeholder="Nhập mã giảm giá"
                            className="flex-1 border rounded px-3 py-1 text-sm"
                        />
                        <button
                            onClick={handleApplyVoucher}
                            disabled={!!voucher}
                            className={`px-3 rounded text-sm text-white ${
                                voucher ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
                            }`}
                        >
                            {voucher ? "Đã áp dụng" : "Áp dụng"}
                        </button>

                    </div>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}


                <button
                onClick={() => setShowGift(!showGift)}
                className="flex justify-between w-full"
              >
                <span className = "cursor-pointer">Bạn muốn tặng cho bạn bè?</span>
                <span>""</span>
              </button>
              {showGift && (
                <input
                  placeholder="Email người nhận"
                  className="w-full border rounded px-3 py-1 text-sm"
                />
              )}
            </div>
            {/*Số điện thoại*/}
            <div className="space-y-1">
              <label className="text-sm font-medium">Số điện thoại</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* SUMMARY */}
              <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{total.toLocaleString()}đ</span>
              </div>

              {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-{discount.toLocaleString()}đ</span>
                  </div>
              )}

              <div className="flex justify-between font-semibold">
                  <span >Thanh toán</span>
                  <span>{finalTotal.toLocaleString()}đ</span>
              </div>


              {/* PAYMENT */}
            <div className="space-y-2">
              <button
                onClick={() => setPaymentMethod("VNPAY")}
                className="w-full bg-blue-700 text-white py-2 rounded cursor-pointer"
              >
                Thanh toán VNPAY & Banking
              </button>
              <button
                onClick={() => setPaymentMethod("QR Banking")}
                className="w-full bg-blue-800 text-white py-2 rounded cursor-pointer"
              >
                Thanh toán QR Banking
              </button>
              <button
                onClick={() => setPaymentMethod("MoMo")}
                className="w-full bg-pink-600 text-white py-2 rounded cursor-pointer"
              >
                Thanh toán MoMo
              </button>
            </div>
          </>
        )}

        {/* ========== XÁC NHẬN ========== */}
        {paymentMethod && (
          <>
            <button
              onClick={() => setPaymentMethod(null)}
              className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer"
            >
              <ArrowLeft size={16} />
              Quay lại chọn phương thức
            </button>

            <div className="text-sm border-t pt-3 space-y-2">
              <div className="flex justify-between">
                <span>Phương thức</span>
                <span className="font-semibold">{paymentMethod}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Tổng thanh toán</span>
                <span>{finalTotal.toLocaleString()}đ</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full bg-green-600 text-white py-2 rounded font-semibold cursor-pointer"
            >
              Xác nhận thanh toán
            </button>
          </>
        )}
      </div>

      {/* ================= MODAL EMAIL ================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-sm rounded-lg p-5 space-y-4 relative">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold text-center">
              Xác nhận thanh toán
            </h3>

            <input
              type="email"
              placeholder="Nhập email xác nhận"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border rounded py-2"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-green-600 text-white rounded py-2"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckoutPanel;
