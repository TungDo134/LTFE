import { Star } from "lucide-react";

function OrderItem({ order }) {
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
          <li key={item.id}>
            {item.title} × {item.quantity}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center pt-2">
        <span className="font-semibold text-blue-600">
          {order.total.toLocaleString()}đ
        </span>

        {order.canReview && (
          <button className="flex items-center gap-1 text-sm text-yellow-500">
            <Star size={16} /> Đánh giá
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderItem;
