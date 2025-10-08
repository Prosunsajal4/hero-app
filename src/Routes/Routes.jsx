import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Banner from "../components/Banner";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        index: true,
        path: "/",
        element: <Banner></Banner>,
        loader: () => fetch("app.json"),
      },
    ],
  },
   {
    path: "*",
    element: <div className="text-center text-3xl font-bold mt-20">404 Not Found</div>,
   }
]);
