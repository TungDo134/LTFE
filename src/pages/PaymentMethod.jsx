import PaymentList from "../features/payment_method/PaymentList";

import HomeCategory from "../features/home/HomeCategory";
function PaymentMethod() {
  return (
    <div>
      <HomeCategory />
      <PaymentList />;
    </div>
  );
}

export default PaymentMethod;
