import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./features/products/ProductDetail";
import Cart from "./pages/cart";
import Login from "./pages/Login";
import PaymentMethod from "./pages/Topup";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import { fetchCart } from "./redux/cartSlice";
import SendMail from "./features/mail/SendEmail";

function App() {
  const dispatch = useDispatch();
  const { user, isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogin && user) {
      dispatch(fetchCart(user.id));
    }
  }, [isLogin, user, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="product/categories/:category" element={<Product />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="topup" element={<PaymentMethod />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />

          {/* Send mail */}
          <Route path="send-mail" element={<SendMail />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
