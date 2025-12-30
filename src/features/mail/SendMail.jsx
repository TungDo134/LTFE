import emailjs from "@emailjs/browser";

import {
  generateRandomAccount,
  generateRandomPassword,
} from "../../utils/RandomAccountGenerator";
import { formatNumber } from "../../utils/formatNumber";

function SendMail({ item, amount, user }) {
  const handleSendEmail = async () => {
    // Tạo dữ liệu Fake Account
    const randomAcc = generateRandomAccount();
    const randomPass = generateRandomPassword(10);

    // Khai báo các param
    const templateParams = {
      order_id: "#" + Math.floor(Math.random() * 1000000), // ID đơn - FAKE
      product_name:
        "ELDEN RING Shadow of the Erdtree Deluxe Edition - Tài khoản Steam Offline", // Tên sản phẩm
      account: randomAcc, // TK
      password: randomPass, // MK
      price: formatNumber("99000"), // giá,
      quantity: 1, // slg
      email: "sont4036@gmail.com", //  "To Email" {{email}} - người nhận mail
      name: "Devine Shop - LTFE", // {{name}} - người gửi mail
    };

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert("Mail đã được gửi thành công!");
    } catch (error) {
      console.error("Lỗi gửi mail:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSendEmail}
        className="bg-green-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-700 cursor-pointer"
      >
        Gửi Mail
      </button>
    </div>
  );
}

export default SendMail;
