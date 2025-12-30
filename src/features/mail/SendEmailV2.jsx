import emailjs from "@emailjs/browser";
import {
  generateRandomAccount,
  generateRandomPassword,
} from "../../utils/RandomAccountGenerator";
import { formatNumber } from "../../utils/formatNumber";

const SendMailV2 = ({ user }) => {
  const cart = [
    {
      id: 1,
      name: "ELDEN RING Shadow of the Erdtree",
      price: 99000,
      quantity: 2, // Mua 2 tài khoản
    },
    {
      id: 2,
      name: "Netflix Premium 1 Tháng",
      price: 55000,
      quantity: 1,
    },
  ];

  const handleCheckoutEmail = async () => {
    // 1. Logic xử lý từng item trong giỏ hàng
    const processedCart = cart.map((item) => {
      // Với mỗi sản phẩm, tạo danh sách TK/MK tương ứng với số lượng (quantity)
      const listCredentials = Array.from({ length: item.quantity }, () => ({
        acc: generateRandomAccount(item.type),
        pass: generateRandomPassword(10),
      }));

      return { ...item, listCredentials };
    });

    // 2. Chuyển đổi Mảng sản phẩm thành Chuỗi HTML (Sử dụng map lồng nhau)
    const productListHtml = processedCart
      .map((item) => {
        // Tạo phần danh sách tài khoản trước
        const credentialRows = item.listCredentials
          .map(
            (c) =>
              `<div style="font-size:13px;margin-bottom:4px;">🔑 TK: <code>${c.acc}</code> | 🔒 MK: <code>${c.pass}</code></div>`
          )
          .join("");

        // Trả về một khối HTML gọn gàng, không dùng tab/xuống dòng thừa
        return (
          `<div style="border-bottom:1px solid #eee;padding:10px 0;">` +
          `<p style="margin:0;font-weight:bold;">${item.name} (x${item.quantity})</p>` +
          `<div style="background:#f9f9f9;padding:8px;margin-top:5px;border-radius:4px;">${credentialRows}</div>` +
          `</div>`
        );
      })
      .join("");

    // 3. Tính tổng tiền đơn hàng
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // 4. Các tham số gửi đi
    const templateParams = {
      order_id: "#ORD" + Math.floor(Math.random() * 1000000),
      user_name: "Khách hàng",
      email: "sont4036@gmail.com", // Email người nhận
      product_list_html: productListHtml, // BIẾN QUAN TRỌNG NHẤT
      total_price: totalPrice.toLocaleString() + "đ",
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        "template_wfr5civ",
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert("Đã gửi thông tin đơn hàng vào email!");
    } catch (error) {
      console.error("Lỗi gửi mail:", error);
    }
  };

  return (
    <button
      onClick={handleCheckoutEmail}
      className="bg-blue-600 text-white px-6 py-2 rounded-md"
    >
      Thanh toán & Nhận mail
    </button>
  );
};

export default SendMailV2;
