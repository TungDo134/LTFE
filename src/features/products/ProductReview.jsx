import { useEffect, useState } from "react";
import { getReviewByProductId } from "../../services/apiReview.js";
import { Calendar } from "lucide-react";

export default function ProductReview({ productId }) {
    const [reviewList, setReviewList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                setIsLoading(true);
                // Bây giờ data trả về đã có sẵn object "user" bên trong mỗi review
                const data = await getReviewByProductId(productId);
                setReviewList(data);
            } catch (error) {
                console.error("Lỗi khi load dữ liệu reviews:", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (productId) fetchReviews();
    }, [productId]);

    if (isLoading) return <p className="text-gray-500 italic p-4 text-center">Đang tải đánh giá...</p>;

    return (
        <div className="mt-10 border-t pt-8 max-w-4xl mx-auto px-4">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
                Khách hàng nhận xét ({reviewList.length})
            </h3>

            {reviewList.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg text-gray-400">
                    Chưa có đánh giá nào cho sản phẩm này.
                </div>
            ) : (
                <div className="space-y-6">
                    {reviewList.map((review) => (
                        <div key={review.id} className="flex gap-4 border-b pb-6 last:border-0">
                            {/* Avatar: Lấy từ review.user.avt */}
                            <img
                                src={review.user?.avt || "https://via.placeholder.com/150"}
                                alt={review.user?.name}
                                className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm"
                            />

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    {/* Name: Lấy từ review.user.name */}
                                    <span className="font-bold text-gray-900 text-sm">
                                        {review.user?.name || "Người dùng ẩn danh"}
                                    </span>
                                    <span className="text-gray-400 text-xs flex items-center gap-1">
                                        <Calendar size={12}/> {review.reviewAt}
                                    </span>
                                </div>

                                {/* Nội dung review */}
                                <div className="relative mt-2">
                                    <p className="text-gray-700 text-sm leading-relaxed p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        {review.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}