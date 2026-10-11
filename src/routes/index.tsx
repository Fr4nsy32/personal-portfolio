import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteNames } from "./route-names";
import Layout from "@/pages/layout";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ContactsPage from "@/pages/contacts";
import ProjectsPage from "@/pages/projects";

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
          element: <ProjectsPage />,
        },
        {
          path: RouteNames.CONTACTS,
          element: <ContactsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RenderRoutes;
