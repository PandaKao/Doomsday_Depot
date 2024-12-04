import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client"; 
import client from "./apolloClient"; 
import "../index.css"; 
import { CartProvider } from "./context/CartContext"; 
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WeaponsPage from "./pages/WeaponsPage";
import ShopDisplay from "./pages/ShopDisplay";
import CategoryPage from "./pages/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/shop",
        element: <ShopDisplay />,
      },
      {
        path: "/weapons",
        element: <WeaponsPage />, // Retain for draft purposes, will delete
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPage />, 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </ApolloProvider>
);

