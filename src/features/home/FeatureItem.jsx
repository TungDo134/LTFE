import {Link} from "react-router-dom";

export default function FeatureItem({id, title, thumbnail, sale_price, original_price, discount_percentage}) {
    return (
        <div className={"mb-2"}>
            <Link to={`/product/${id}`}>
                <img className={"rounded-lg mb-2"} src={thumbnail}/>
                <div className={"text-[14px] mb-2"}>
                    {title}
                </div>
            </Link>
            <div className={""}>
                <span className={"mr-2 text-[14px] font-bold"}>{sale_price?.toLocaleString('vi-VN')}đ</span>
                <span className={"mr-6 text-[14px] text-gray-500/80 line-through"}>{original_price?.toLocaleString('vi-VN')}đ</span>
                <span className={"bg-red-700 text-white rounded-lg pt-1 pb-1 pl-2 pr-2 text-[14px]"}>
                    -{discount_percentage}%
                </span>
            </div>
        </div>
    );
}

