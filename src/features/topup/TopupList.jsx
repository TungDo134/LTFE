import { useState } from "react";
import { useSelector } from "react-redux";

import TopupItem from "./TopupItem";

const PaymentList = () => {
  const { isLogin, user } = useSelector((state) => state.auth);
  const [selectedId, setSelectedId] = useState(null);

  const methods = [
    {
      id: 1,
      name: "Nạp tự động bằng quét QR - Chuyển khoản ngân hàng",
      img: "/pic/payment_method/onl_banking.png",
    },
    {
      id: 2,
      name: "Thanh toán VNPAY-QR",
      img: "/pic/payment_method/vn_pay.png",
    },
    {
      id: 3,
      name: "Nạp số dư tự động bằng thẻ ngân hàng",
      img: "/pic/payment_method/Atm.png",
    },
    {
      id: 4,
      name: "Thanh toán bằng thẻ Master/Visa/JCB",
      img: "/pic/payment_method/visa-master.png",
    },
    {
      id: 5,
      name: "Nạp tiền qua thẻ cào Viettel",
      img: "/pic/payment_method/Viettel.png",
    },
  ];

  const handleSelect = (id) => {
    // Nếu bấm lại vào thẻ đã chọn thì đóng nó lại (null), nếu không thì chọn id mới
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <div className="bg-white mx-auto p-8 w-full rounded-sm">
        <div className="flex flex-col">
          {methods.map((item) => (
            <TopupItem
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              isDimmed={selectedId !== null && selectedId !== item.id}
              onSelect={handleSelect}
              isLogin={isLogin}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
