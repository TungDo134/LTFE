import { Link } from "react-router-dom";
import { useBestSeller } from "../features/products/useBestSeller";
import Slider from "./Slider";

function HeroHome() {
  // slider
  const { products: productBestSeller, loading } = useBestSeller();
  if (loading) return <div>Loading...</div>;

  // right slides
  const slides = [
    {
      id: "12",
      thumbnail:
        "https://steamcdn-a.akamaihd.net/steam/apps/1030300/header.jpg",
    },

    {
      id: "32",
      title: "Little Nightmares 3 Deluxe Edition - Tài khoản Steam Offline",
      thumbnail:
        "https://cdn.divineshop.vn/image/catalog/header (2)-49345.jpg?hash=1760082942",
    },
  ];

  return (
    <>
      <div className="w-full mx-auto ">
        <img
          className="inline-block h-auto w-full align-middle rounded-2xl
           mask-[linear-gradient(to_bottom,rgba(0,0,0,1)_65%,rgba(0,0,0,0)_96%)]"
          src="/pic/page_bg_vietnamese.jpg"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-3 gap-3">
        <Slider productBestSeller={productBestSeller} />
        {/* right */}
        <div className="flex flex-col items-center justify-between gap-3">
          {slides.map((s) => (
            <Link to={`/product/${s.id}`}>
              <div>
                <img className="w-full rounded-xl" src={s.thumbnail}></img>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default HeroHome;
