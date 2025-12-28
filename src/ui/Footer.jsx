import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="bg-[#f3f4f6]">
        <div className="bg-white p-2">
          {/* Phương thức thanh toán */}
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 ">
            <div className="cursor-pointer">
              <Link
                to={`topup`}
                className="flex items-center justify-between gap-3 "
              >
                <img
                  className="block h-7 max-w-full align-middle"
                  src="/pic/momo.svg"
                />
                <img
                  className="block h-7 max-w-full align-middle"
                  src="/pic/vnpay.svg"
                />
                <img
                  className="block h-7 max-w-full align-middle"
                  src="/pic/visa.svg"
                />
                <img
                  className="block h-7 max-w-full align-middle"
                  src="/pic/master_card.svg"
                />
                <small>và nhiều hình thức thanh toán khác</small>
              </Link>
            </div>
          </div>
        </div>

        {/* Giới thiệu */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 cursor-pointer">
          <a className="flex items-center justify-between gap-3 ">
            <img
              className="block h-7 max-w-full align-middle"
              src="/pic/facebook.svg"
            />
            <img
              className="block h-7 max-w-full align-middle"
              src="/pic/youtube.svg"
            />
          </a>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-3 flex">
          <div className="border-b border-gray-500/50 w-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Content */}
          <div className="grid grid-cols-3 justify-around">
            <div>
              <p className="mb-2 font-bold">Giới thiệu</p>
              <ul className="text-sm gap-1 flex flex-col justify-evenly font-normal cursor-pointer [&>li]:hover:underline">
                <li className="">
                  <a>Game bản quyền là gì?</a>
                </li>
                <li>
                  <Link to={"about-us"}>Giới thiệu Divine Shop</Link>
                </li>
                <li>
                  <a>Điều khoản dịch vụ</a>
                </li>
                <li>
                  <a>Chính sách bảo mật</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-2 font-bold">Tài khoản</p>
              <ul className="text-sm gap-1 flex flex-col justify-evenly font-normal cursor-pointer [&>li]:hover:underline">
                <li>
                  <a>Đăng nhập</a>
                </li>
                <li>
                  <a>Đăng ký</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-2 font-bold">Liên hệ</p>
              <ul className="text-sm gap-1 flex flex-col justify-evenly font-normal cursor-pointer [&>li]:hover:underline">
                <li>
                  <a>
                    {" "}
                    Hotline tự động{" "}
                    <span className="text-red-600">1900 633 305</span>
                  </a>
                </li>
                <li>
                  <Link to={"contact"}> Liên hệ Hỗ trợ</Link>
                </li>
                <li>
                  <a> Chat với CSKH</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Certification */}
          <div>
            <img src="/pic/dmca_protected.png"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
