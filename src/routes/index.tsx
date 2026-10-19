import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteNames } from "./route-names";
import Layout from "@/layout";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ContactsPage from "@/pages/contacts";
import ProjectsPage from "@/pages/projects";
import ProjectDetailPage from "@/pages/projects/project-details";

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
        { path: RouteNames.PROJECTS, element: <ProjectsPage /> },
        {
          path: `${RouteNames.PROJECTS}/:slug`,
          element: <ProjectDetailPage />,
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
