import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { formatNumber } from "../../utils/formatNumber";
import { FaXmark } from "react-icons/fa6";

function RecentView({ recent_product, onRemove }) {
  return (
    <div className="relative w-full group mb-6">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={4}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        className="py-4"
      >
        {recent_product?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative flex items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group/item">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(item.id);
                }}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500
                  cursor-pointer bg-gray-100/50 rounded-full"
              >
                <FaXmark className="w-4 h-4" />
              </button>

              <Link
                to={`/product/${item.id}`}
                className="flex items-center w-full gap-3"
              >
                <div className="shrink-0 w-30 h-16 overflow-hidden rounded-lg">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="grow min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate line-clamp-2 leading-tight mb-1">
                    {item.title}
                  </p>
                  <p className="text-red-600 font-bold text-sm">
                    {formatNumber(item.price)}
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-xl 
      rounded-full flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-all 
      opacity-0 group-hover:opacity-100 -translate-x-1/2"
      >
        <ChevronLeftIcon className="w-6 h-6 text-slate-700 cursor-pointer" />
      </button>

      <button
        className="next-btn absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-xl 
      rounded-full flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-all 
      opacity-0 group-hover:opacity-100 translate-x-1/2"
      >
        <ChevronRightIcon className="w-6 h-6 text-slate-700 cursor-pointer" />
      </button>
    </div>
  );
}

export default RecentView;
