import {useState, useEffect} from "react";
import {getFeatureProducts} from "../../services/apiProduct.js";
import FeatureItem from "./FeatureItem.jsx";
import Spinner from "../../ui/Spinner.jsx";

export default function FeaturedProduct() {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false); // dùng cho btn xem thêm

    useEffect(() => {
        let isMounted = true; // ktra item còn tồn tại ko
        async function fetchData() {
            try {
                if (page === 1) setLoading(true);
                else setIsFetchingMore(true);
                const data = await getFeatureProducts(page);
                if (isMounted) {
                    // nếu là trang 1 thì thay thế hoàn toàn còn ko thì mới nối mảng
                    setItem(prevItems => (page === 1 ? data : [...prevItems, ...data]));
                }
            } catch (error) {
                if (isMounted) console.error("Error: ", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                    setIsFetchingMore(false);
                }
            }
        }
        fetchData();
        return () => { isMounted = false; };
    }, [page]);

    if (loading) return <Spinner/>;
    return (
        <div className={"w-full mx-auto max-w-7xl py-2 mb-4 border-b-2 border-gray-500/50"}>
            <div className={"pt-8 pb-8"}>
                <div className={"text-lg font-bold"}>
                    Sản phẩm nổi bật
                </div>
                <div className={"text"}>
                    Danh sách những sản phẩm theo xu hướng mà có thể bạn sẽ thích
                </div>
            </div>
            <div>
                <div className="grid grid-cols-4 gap-4">
                    {item.map((game) => (
                        <FeatureItem key={game.id} {...game} />
                    ))}
                </div>
                <div className="mt-4 mb-4 flex justify-center">
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={isFetchingMore}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                        {isFetchingMore ? "Đang tải..." : "Xem thêm"}
                    </button>
                </div>
            </div>
        </div>
    );
}
