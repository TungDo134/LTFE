import {useState, useEffect} from "react";
import {getFeatureProducts} from "../../services/apiProduct.js";
import FeatureItem from "./FeatureItem.jsx";
import Spinner from "../../ui/Spinner.jsx";

export default function FeaturedProduct() {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getFeatureProducts();
                setItem(data);
            } catch (error) {
                console.error("Error: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <Spinner/>;
    return (
        <div className={"w-full mx-auto max-w-7xl py-2"}>
            <div>
                <div className={"text-lg font-bold"}>
                    Sản phẩm nổi bật
                </div>
                <div className={"text-sm"}>
                    Danh sách những sản phẩm theo xu hướng mà có thể bạn sẽ thích
                </div>
            </div>
            <div>
                <div className="grid grid-cols-4 gap-4">
                    {item.map((game) => (
                        <FeatureItem key={game.id} {...game} />
                    ))}
                </div>
                <div>Xem thêm</div>
            </div>
        </div>
    );
}

