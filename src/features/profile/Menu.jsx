import {User, ShoppingCart, FingerprintPattern, HandCoins} from 'lucide-react';
import {Link} from 'react-router-dom';

export default function Menu({activeTab}) {

    const baseClass = "flex p-6 gap-4 border-b-1 border-blue-500 opacity-70"
    const selectedClass = "border-l-6";

    return (
        <div className="flex flex-col border border-blue-500 rounded-md shadow-lg overflow-hidden">
            <Link
                to="?tab=account"
                className={`${baseClass} ${activeTab === 'account' ? selectedClass : ''}`}>
                <User size={20}/>
                <span>Tài khoản</span>
            </Link>

            <Link
                to="?tab=orders"
                className={`${baseClass} ${activeTab === 'orders' ? selectedClass : ''}`}>
                <ShoppingCart size={20}/>
                <span>Lịch sử mua hàng</span>
            </Link>

            <Link
                to="?tab=purchase-history"
                className={`${baseClass} ${activeTab === 'purchase-history' ? selectedClass : ''}`}>
                <HandCoins size={20}/>
                <span>Lịch sử thanh toán</span>
            </Link>

            <Link
                to="?tab=security"
                className={`${baseClass} ${activeTab === 'security' ? selectedClass : ''}`}>
                <FingerprintPattern size={20}/>
                <span>Mật khẩu và bảo mật</span>
            </Link>
        </div>
    );
}