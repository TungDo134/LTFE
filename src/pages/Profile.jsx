import {useSearchParams} from "react-router-dom";
import Menu from "../features/profile/Menu.jsx";
import UserInfo from "../features/profile/UserInfo.jsx";
import Security from "../features/profile/Security.jsx";
import PurchaseHistory from "../features/profile/PurchaseHistory.jsx";
import Orders from "../features/profile/Orders.jsx";

function Profile() {
    const [param] = useSearchParams();
    const activeTab = param.get("tab");

    return (
        <div className={"max-w-7xl mx-auto px-4 py-3 flex gap-8"}>
            <div className={"w-[25%]"}>
                <Menu activeTab={activeTab}/>
            </div>

            {activeTab === "account" && <UserInfo/>}
            {activeTab === "orders" && <Orders/>}
            {activeTab === "purchase-history" && <PurchaseHistory/>}
            {activeTab === "security" && <Security/>}
        </div>
    );
}

export default Profile;
