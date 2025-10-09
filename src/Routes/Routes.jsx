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
        loader: async () => {
          const storedApps = localStorage.getItem("allApps");
          if (storedApps) return JSON.parse(storedApps);
          const res = await fetch("/data/apps.json");
          const data = await res.json();
          localStorage.setItem("allApps", JSON.stringify(data));
          return data;
        },
      },
    ],
  },
  {
    path: "*",
    element: <ErrorElement />,
  },
  {
    path: "/apps",
    element: <Apps />,
    loader: async () => {
      const storedApps = localStorage.getItem("allApps");
      if (storedApps) return JSON.parse(storedApps);
      const res = await fetch("/data/apps.json");
      const data = await res.json();
      localStorage.setItem("allApps", JSON.stringify(data));
      return data;
    },
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
