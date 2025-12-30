import { useSearchParams } from "react-router-dom";
import Menu from "../features/profile/Menu.jsx";
import UserInfo from "../features/profile/UserInfo.jsx";
import PurchaseHistory from "../features/profile/PurchaseHistory.jsx";
import Security from "../features/profile/Security.jsx";
import Orders from "../features/profile/Orders.jsx";

function Profile() {
  const [param] = useSearchParams();
  const activeTab = param.get("tab");

  return (
    <div className={"max-w-7xl min-h-125 mx-auto px-4 py-3 flex gap-8"}>
      <div className={"w-[25%]"}>
        <Menu activeTab={activeTab} />
      </div>

      <div className={"w-full h-fit border-2 border-blue-500 rounded-lg p-6"}>
        {activeTab === "account" && <UserInfo />}
        {activeTab === "security" && <Security />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "purchase-history" && <PurchaseHistory />}
      </div>
    </div>
  );
}

export default Profile;
