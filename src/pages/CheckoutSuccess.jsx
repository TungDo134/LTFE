import { useNavigate } from "react-router-dom";

function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <main className="m-5 pb-5">
      <div className="container mx-auto">
        {/* Checkout content */}
        <div className="text-center mt-5">
          <div className="flex justify-center">
            <div className="w-full lg:w-2/3 md:w-5/6">
              <div className="bg-white p-12 rounded-lg shadow-sm flex flex-col items-center gap-4">
                <h1 className="text-green-600 text-3xl mb-4 pt-12 font-semibold">
                  Thanh toán đơn hàng thành công!
                </h1>
                <p className="text-2xl font-light">
                  Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Vui lòng
                  kiểm tra email
                </p>

                <img
                  src="/pic/thank.png"
                  alt="Cảm ơn"
                  className="w-36 h-auto mt-12"
                />
                <div className="flex gap-4 justify-between mt-6 cursor-pointer">
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Quay về trang chủ
                  </button>
                  <button
                    onClick={() => navigate("/product")}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutSuccess;
