import HomeCategory from "../features/home/HomeCategory";
import FeaturedProduct from "../features/home/FeaturedProduct.jsx";
import HeroHome from "../ui/HeroHome.jsx";
import BannerSale from "../ui/BannerSale.jsx";
import { useSelector } from "react-redux";
import SuggestCreateLogin from "../ui/SuggestCreateLogin.jsx";

function Home() {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <div>
      <HomeCategory />
      <HeroHome />
      <BannerSale />
      <FeaturedProduct />
      <SuggestCreateLogin isLogin={isLogin} />
    </div>
  );
}

export default Home;
