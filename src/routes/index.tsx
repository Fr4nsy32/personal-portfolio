import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteNames } from "./route-names";
import Layout from "@/pages/layout";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";

const RenderRoutes: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: RouteNames.ABOUT,
          element: <AboutPage />,
        },
        {
          path: RouteNames.PROJECTS,
          element: <div className="text-white text-center">Projects Page</div>,
        },
        {
          path: RouteNames.CONTACTS,
          element: <div className="text-white text-center">Contact Page</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RenderRoutes;
