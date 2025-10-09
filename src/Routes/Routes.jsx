import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Banner from "../components/Banner";
import Apps from "../pages/Apps";
import ErrorElement from "../components/ErrorElement";
import AppDetailsPage from "../components/AppDetailsPage";
import Installation from "../pages/Installation";

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
    element: <ErrorElement />,
  },
  {
    path: "/Apps",
    element: <Apps></Apps>,
    loader: () => fetch("app.json"),
  },
  {
    path: "/app/:id",
    element: <AppDetailsPage />,
    loader: async ({ params }) => {
      const res = await fetch("/app.json");
      const data = await res.json();
      return data.find((app) => app.id == params.id);
    },
  },
  {
    path: "/Installation",
    element: <Installation />,
  },
]);
