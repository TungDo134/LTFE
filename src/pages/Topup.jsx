import TopupList from "../features/topup/TopupList";

import HomeCategory from "../features/home/HomeCategory";
function PaymentMethod() {
  return (
    <div>
      <HomeCategory />
      <TopupList />;
    </div>
  );
}

export default PaymentMethod;
