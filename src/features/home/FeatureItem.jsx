import {Link} from "react-router-dom";

export default function FeatureItem({id, title, thumbnail, sale_price, original_price, discount_percentage}) {
    return (
        <div>
            <Link to={`/product/${id}`}>
                <img src={thumbnail}/>
                <div>
                    <div>
                        {title}
                    </div>
                    <div>
                        <span>{sale_price}</span>
                        <span>{original_price}</span>
                        <span>{discount_percentage}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

