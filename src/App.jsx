import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./admin/products/ProductsPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import BrandManager from "./admin/brands/Brand.jsx";
import CategoryManager from "./admin/categories/Category.jsx";
import UserManager from "./admin/users/User.jsx";
import OrderManager from "./admin/orders/Order.jsx";
import Dashboard from "./admin/DashBoard.jsx";
import ClientLayout from "./layouts/ClientLayout.jsx";
import NotFound from "./pages/404.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Detail from "./pages/Detail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/details/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="brands" element={<BrandManager />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="orders" element={<OrderManager />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
