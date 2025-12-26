import { useState } from "react";
import PaymentMethodItem from "./PaymentMethodItem";

const PaymentList = () => {
  const [selectedId, setSelectedId] = useState(null);

  const methods = [
    {
      id: 1,
      name: "Nạp tự động bằng quét QR - Chuyển khoản ngân hàng",
      desc: "Quét mã QR chuyển khoản online. Phí 0%",
      img: "/pic/payment_method/onl_banking.png",
    },
    {
      id: 2,
      name: "Thanh toán VNPAY-QR",
      desc: "Quét mã QR PAY trên ứng dụng Mobile Banking, phí giao dịch 2%",
      img: "/pic/payment_method/vn_pay.png",
    },
    {
      id: 3,
      name: "Nạp số dư tự động bằng thẻ ngân hàng",
      desc: "Phí 0.9% + 900đ",
      img: "/pic/payment_method/Atm.png",
    },
    {
      id: 4,
      name: "Thanh toán bằng thẻ Master/Visa/JCB",
      desc: "Phí 2.36% + 2.660 đ",
      img: "/pic/payment_method/visa-master.png",
    },
    {
      id: 5,
      name: "Nạp tiền qua thẻ cào Viettel",
      desc: "Nạp tiền qua thẻ cào Viettel, phí giao dịch 30%",
      img: "/pic/payment_method/Viettel.png",
    },
  ];

  const handleSelect = (id) => {
    // Nếu bấm lại vào thẻ đã chọn thì đóng nó lại (null), nếu không thì chọn id mới
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <div className="bg-[#f3f4f6] mx-auto p-8 w-full rounded-sm">
        <div className="flex flex-col">
          {methods.map((item) => (
            <PaymentMethodItem
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              isDimmed={selectedId !== null && selectedId !== item.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
