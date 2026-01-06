import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import emailjs from "@emailjs/browser";
import {
  generateRandomAccount,
  generateRandomPassword,
} from "../../utils/RandomAccountGenerator";

import { formatNumber } from "../../utils/formatNumber";
import { getOrdersByUserApi } from "../../services/apiOrder";

import { updateOrderStatus } from "../../redux/orderSlice";

function SendMail() {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const dispatch = useDispatch();

  // Lấy và set data cho orders (Json-server)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersByUserApi(user.id, "waiting");
        setOrders(response.data);

        console.log(
          "- User ID:: " + user.id + "\n" + "- Dữ liệu đơn hàng thực tế:",
          response.data
        );
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user.id]);

  // Trigger hàm send mail khi lấy đủ data
  useEffect(() => {
    // Đủ data = Có user, có ít nhất 1 order, chưa bị trigger gửi mail
    if (user?.id && orders.length > 0 && !hasTriggered) {
      setHasTriggered(true); // Đánh dấu đã trigger
      handleCheckoutEmail(); // gọi hàm send mail
    }
  }, [orders, user, hasTriggered]);

  const handleCheckoutEmail = async () => {
    setIsProcessing(true);

    // Xử lý từng item trong orders
    const processedCart = orders[0].items.map((item) => {
      // Với mỗi sản phẩm, tạo danh sách TK/MK tương ứng với quantity
      const listCredentials = Array.from({ length: item.quantity }, () => ({
        acc: generateRandomAccount(item.type),
        pass: generateRandomPassword(10),
      }));

      return { ...item, listCredentials };
    });

    // Tạo html cho template email
    const productListHtml = processedCart
      .map((item) => {
        const credentialRows = item.listCredentials
          .map(
            (c) =>
              `<div style="font-size:13px;margin-bottom:4px;">🔑 TK: <code>${c.acc}</code> | 🔒 MK: <code>${c.pass}</code></div>`
          )
          .join("");

        return (
          `<div style="border-bottom:1px solid #eee;padding:10px 0;">` +
          `<p style="margin:0;font-weight:bold;">${item.title} (x${item.quantity})</p>` +
          `<div style="background:#f9f9f9;padding:8px;margin-top:5px;border-radius:4px;">${credentialRows}</div>` +
          `</div>`
        );
      })
      .join("");

    // Tổng tiền order
    const totalPrice = orders[0].total;

    // Các param cho template email
    const templateParams = {
      order_id: orders[0].id,
      user_name: user.name, // tên KH
      email: user.email, // Email người nhận
      product_list_html: productListHtml, // List sản phẩm + tk/mk tương ứng
      total_price: formatNumber(totalPrice),
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert("Đã gửi thông tin đơn hàng tới email!");

      // Update status = success lên server (file json)
      if (orders[0]?.id) {
        await dispatch(
          updateOrderStatus({
            orderId: orders[0].id,
            status: "success",
          })
        ).unwrap();
      }

      console.log("Email đã được gửi và trạng thái đã cập nhật!");
    } catch (error) {
      console.error("Lỗi quy trình tự động:", error);
      setHasTriggered(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-inner">
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mb-3"></div>
          <p className="text-gray-600 font-medium">
            Đang xử lý gửi thông tin đơn hàng...
          </p>
        </>
      ) : hasTriggered ? (
        <p className="text-green-600 font-bold">
          ✅ Hoàn tất! Vui lòng kiểm tra email.
        </p>
      ) : (
        <p className="text-gray-500 italic">Đang chuẩn bị dữ liệu...</p>
      )}
    </div>
  );
}

export default SendMail;
