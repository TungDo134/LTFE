import { Star } from "lucide-react";
import {submitReview} from "../../services/apiReview.js";
import {useSelector} from "react-redux";
import {useState} from "react";
import {updateOrderCanReview} from "../../services/apiOrder.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function OrderItem({ order }) {
    const [isReviewing, setIsReviewing] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [canReview, setCanReview] = useState(order.canReview);
    const { user } = useSelector((state) => state.auth);

    const handleReviewSubmit = () => {
        const today = new Date();
        const review = {
            content: reviewText,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                avt: user.avt
            },
            reviewAt: today.toLocaleDateString('vi-VN'),
            productId: order.items[0].productId,
            orderId: order.id
        }
        toast.promise(
            (async () => {
                await submitReview(review);
                await updateOrderCanReview(order.id, false);
            })(),
            {
                loading: 'Đang gửi đánh giá...',
                success: 'Đánh giá thành công! Cảm ơn bạn.',
                error: 'Gửi đánh giá thất bại, vui lòng thử lại.',
            }
        ).then(() => {
            setIsReviewing(false);
            setReviewText("");
            setCanReview(false);
        }).catch((err) => {
            console.error(err);
        });
    };


  // Màu chữ cho các status
  const getStatusLabel = (status) => {
    switch (status) {
      case "success":
        return (
          <span className="text-green-600 font-bold italic">Thành công</span>
        );
      case "cancel":
        return <span className="text-red-600 font-bold italic">Đã hủy</span>;
      case "waiting":
        return (
          <span className="text-yellow-600 font-bold italic">Đang chờ</span>
        );
      default:
        return <span className="text-gray-600">{status}</span>;
    }
  };

  return (
    <div className="border rounded-md p-4 space-y-2 bg-white">
      <div className="flex justify-between text-sm">
        <span>
          Mã đơn: <b>{order?.id?.toUpperCase()}</b>
        </span>
        <span className="text-gray-500">{order.date}</span>
      </div>

      <div className="text-sm text-gray-600">
        Trạng thái: {getStatusLabel(order.status)}
      </div>

      <ul className="text-sm list-disc pl-5">
          {order.items.map((item) => (
              <li key={item.productId}>
                  <Link
                      to={`/product/${item.productId}`}
                      className="text-blue-600 hover:underline"
                  >
                      {item.title}
                  </Link>
                  {" "}× {item.quantity}
              </li>
          ))}
      </ul>

      <div className="pt-2">
        <span className="font-semibold text-blue-600">
          {order.total.toLocaleString()}đ
        </span>

        <div className={"flex justify-end"}>
            {canReview && !isReviewing && (
                <button className="flex items-center gap-1 text-sm cursor-pointer text-yellow-500"
                        onClick={() => setIsReviewing(true)}>
                    <Star size={16} /> Đánh giá
                </button>
            )}
            {isReviewing && (
                <div className="mt-2 flex flex-col gap-2">
                    <input type={"text"}
                           className="w-lg p-2 border rounded-md text-sm focus:ring-1 focus:ring-yellow-500 outline-none"
                           placeholder="Viết đánh giá của bạn..."
                           value={reviewText}
                           onChange={(e) => setReviewText(e.target.value)}/>
                    <div className="flex gap-2">
                        <button
                            onClick={handleReviewSubmit}
                            className="bg-yellow-500 text-white px-3 py-1 cursor-pointer rounded text-sm flex items-center gap-1">
                            Gửi
                        </button>
                        <button
                            onClick={() => setIsReviewing(false)}
                            className="text-gray-500 cursor-pointer text-sm">
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
