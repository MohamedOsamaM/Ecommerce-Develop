/* eslint-disable no-unused-vars */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Products from "./Component/Products/Products";
import Brands from "./Component/Brands/Brands";
import Categories from "./Component/Categories/Categories";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Notfound from "./Component/Notfound/Notfound";
import Spcategory from "./Component/Categories/Spcategory";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import { useContext } from "react";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import RecentProduct from "./Component/RecentProduct/RecentProduct";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import CategorySlider from "./Component/CategorySlider/CategorySlider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Spbrand from "./Component/Spbrand/Spbrand";
import UpdatePass1 from "./Component/UpdatePass/UpdatePass1";
import UpdatePass2 from "./Component/UpdatePass/UpdatePass2";
import UpdatePass3 from "./Component/UpdatePass/UpdatePass3";
import Wishlist from "./Component/Wishlist/Wishlist";
import Order from "./Component/Order/Order";
import Allorder from "./Component/Allorder/Allorder";
import WishContextProvider from "./Context/WishContext";
let query = new QueryClient();
let router = createBrowserRouter([
  {
    path: "",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home></Home>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart></Cart>
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products></Products>
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands></Brands>
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist></Wishlist>
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorder></Allorder>
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <Order></Order>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories></Categories>
          </ProtectedRoute>
        ),
      },
      {
        path: "spCategory/:category/:id",
        element: (
          <ProtectedRoute>
            <Spcategory></Spcategory>
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "*",
        element: <Notfound></Notfound>,
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails></ProductDetails>
          </ProtectedRoute>
        ),
      },
      {
        path: "spbrand/:id",
        element: (
          <ProtectedRoute>
            <Spbrand></Spbrand>
          </ProtectedRoute>
        ),
      },
      {
        path: "UpdatePassword1",
        element: <UpdatePass1></UpdatePass1>,
      },
      {
        path: "UpdatePassword2",
        element: <UpdatePass2></UpdatePass2>,
      },
      {
        path: "UpdatePassword3",
        element: <UpdatePass3></UpdatePass3>,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <CartContextProvider>
      <WishContextProvider>
        <QueryClientProvider client={query}>
          <UserContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster position="top-right"></Toaster>
            <ReactQueryDevtools></ReactQueryDevtools>
          </UserContextProvider>
        </QueryClientProvider>
        </WishContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
