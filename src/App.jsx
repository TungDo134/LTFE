import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetail from "./features/products/ProductDetail";
import AppLayout from "./ui/AppLayout";
import Product from "./pages/Product";
import Home from "./pages/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    // tgian mà data được coi là "fresh"
    queries: { staleTime: 3 * 60 * 1000 },
  },
});

function App() {
  return (
    // react-query
    <QueryClientProvider client={queryClient}>
      {/* react-query-devtools  */}
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
