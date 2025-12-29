import HomeCategory from "../features/home/HomeCategory";
import FeaturedProduct from "../features/home/FeaturedProduct.jsx";
import HeroHome from "../ui/HeroHome.jsx";

function Home() {
  return (
    <div>
      <HomeCategory></HomeCategory>
      <HeroHome/>
      <FeaturedProduct></FeaturedProduct>
    </div>
  );
}

export default Home;
