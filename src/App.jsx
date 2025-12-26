import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductDetail from "./features/products/ProductDetail";
import AppLayout from "./ui/AppLayout";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Cart from "./pages/cart";
import PaymentMethod from "./pages/PaymentMethod";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          {/* Products by cate */}
          <Route path="product/categories/:category" element={<Product />} />
          {/* Detail Product */}
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment-method" element={<PaymentMethod />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
