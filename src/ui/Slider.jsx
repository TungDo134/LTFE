import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Slider({ productBestSeller }) {
  return (
    <div className="relative w-175 h-87.5 mx-auto overflow-hidden rounded-lg shadow-lg col-span-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {productBestSeller?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={`/product/${slide.id}`}>
              <div className="relative w-full h-full">
                <img
                  src={slide.thumbnail}
                  alt={slide.title}
                  className="block w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
