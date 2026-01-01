import { Star } from "lucide-react";

function OrderItem({ order }) {


    return (
        <div className="border rounded-md p-4 space-y-2 bg-white">
            <div className="flex justify-between text-sm">
                <span>Mã đơn: <b>{order.id}</b></span>
                <span className="text-gray-500">{order.date}</span>
            </div>

            <div className="text-sm text-gray-600">
                Trạng thái: <b>{[order.status]}</b>
            </div>

            <ul className="text-sm list-disc pl-5">
                {order.items.map(item => (
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
