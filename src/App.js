import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import EcommerceProvider from "./context/EcommerceContext";
import AddProducts from "./pages/AddProducts";
import AddAddress from "./pages/AddAddress";
import Checkout from "./pages/Checkout";
import NotFound from "./components/NotFound";
// import ErrorPage from "./pages/ErrorPage";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const UpdateAddress = lazy(() => import("./pages/UpdateAddress"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const AllOrders = lazy(() => import("./pages/AllOrders"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loading />}>
              <Products />
            </Suspense>
          ),
          loader: () =>
            import("./pages/Products").then((module) => module.loader()),
        },
        {
          path: "products/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductDetails />
            </Suspense>
          ),
          loader: (meta) =>
            import("./pages/ProductDetails").then((module) =>
              module.loader(meta),
            ),
        },
        { path: "add", element: <AddProducts /> },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "addAddress",
          element: (
            <ProtectedRoutes>
              <AddAddress />
            </ProtectedRoutes>
          ),
        },
        {
          path: "address/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoutes>
                <UpdateAddress />
              </ProtectedRoutes>
            </Suspense>
          ),
          loader: (meta) =>
            import("./pages/UpdateAddress").then((module) =>
              module.loader(meta),
            ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "orders",
          loader: () =>
            import("./pages/AllOrders").then((module) => module.loader()),
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "user",
          element: (
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          ),
        },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <EcommerceProvider>
      <RouterProvider router={router} />
    </EcommerceProvider>
  );
}

export default App;
