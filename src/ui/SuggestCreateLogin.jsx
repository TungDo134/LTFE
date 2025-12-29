import { Link } from "react-router-dom";

function SuggestCreateLogin({ isLogin }) {
  return (
    <div className="w-full bg-black py-2 mb-4">
      {isLogin ? (
        "Đã login"
      ) : (
        <div className="my-8 w-full mx-auto max-w-7xl text-white">
          <div className="grid grid-cols-3 items-center gap-2 justify-between">
            <div>
              <img className="rounded-md h-40 " src="/pic/onl.png" />
            </div>
            <div className="col-span-2 flex flex-col justify-between gap-3">
              <p className="text-2xl font-bold">Bạn chưa có tài khoản?</p>
              <p className="text-sm font-medium">
                Hãy tạo ngay một tài khoản để sử dụng đầy đủ các tính năng, tích
                lũy ưu đãi khi thanh toán các sản phẩm và tham gia vào chương
                trình Giới thiệu bạn bè nhận hoa hồng vĩnh viễn tại Divine Shop.
              </p>
              <Link
                to={"/login"}
                className="px-6 py-2 w-68 bg-[#2579F2] text-white rounded-md"
              >
                Đăng kí hoặc đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestCreateLogin;
