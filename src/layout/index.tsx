import { Outlet } from "react-router-dom";
import DotBackground from "./dot-background";
import NavbarComponent from "./navbar";
import { version } from "@/../package.json";

const Layout: React.FC = () => {
  return (
    <div className="min-h-dvh flex flex-col" id="layout">
      <DotBackground />
      <NavbarComponent />

      <main className="flex-1 pt-24">
        <Outlet />
      </main>

      <footer className="mt-auto text-center text-sm text-muted-foreground py-4">
        <p>&copy; {new Date().getFullYear()} Andi Sina. All rights reserved.</p>
        <p>Version: {version}</p>
      </footer>
    </div>
  );
};

export default Layout;
