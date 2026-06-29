import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./root.css";
import { ToastContainer }
from "react-toastify";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import { Provider } from "react-redux";
import { appStore } from "./Redux/appStore";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./MainLayout";
import Dashboard from "./Pages/Dashboard";
import Collection from "./Pages/Collection";
import Basket from "./Pages/Basket";
import Account from "./Pages/Account";
import ProductDetails from "./Pages/ProductDetails";
import ErrorPage from "./Pages/ErrorPage";
import Wishlist from "./Pages/Wishlist.jsx";
const siteRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "collection",
        element: <Collection />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "collection/:categoryName",
        element: <Collection />,
      },
      {
        path: "wishlist",
        element: <Wishlist />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "success",
        element: <OrderSuccess />
      },
      {
        path: "collection/item/:itemName",
        element: <ProductDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <Provider store={appStore}>
      <RouterProvider router={siteRouter} />
    </Provider>
  </StrictMode>
);