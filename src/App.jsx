import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductDetail from "./features/products/ProductDetail";
import AppLayout from "./ui/AppLayout";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Cart from "./pages/cart";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import PaymentMethod from "./pages/Topup.jsx";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
        }}
      />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          {/* Products by cate */}
          <Route path="product/categories/:category" element={<Product />} />
          {/* Detail Product */}
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* cart -> checkout */}
          <Route path="cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Các phương thức thanh toán */}
          <Route path="topup" element={<PaymentMethod />} />

          {/* About Us */}
          <Route path="about-us" element={<AboutUs />} />
        </Route>
        <Route path={"login"} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
