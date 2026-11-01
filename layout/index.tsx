import type { PropsWithChildren } from "react";
import DotBackground from "./dot-background";
import NavbarComponent from "./navbar";
import Footer from "./footer";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-dvh flex flex-col" id="layout">
      <DotBackground />
      <NavbarComponent />

      <main className="flex-1 pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
