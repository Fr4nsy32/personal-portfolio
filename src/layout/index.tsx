import { Outlet, ScrollRestoration } from "react-router-dom";
import DotBackground from "./dot-background";
import NavbarComponent from "./navbar";
import Footer from "./footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-dvh flex flex-col" id="layout">
      <DotBackground />
      <NavbarComponent />
      <ScrollRestoration />

      <main className="flex-1 pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
