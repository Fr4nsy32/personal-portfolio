import TerminalCarousel from "./terminal-carousel";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-3">
      <h1 className="font-heading text-5xl font-medium md:text-7xl text-white text-center">
        Full_Stack Developer
      </h1>
      <p className="mt-4 text-lg text-gray-400 text-center p-3 pt-2">
        Full-stack developer turning ideas into reliable, well-crafted web
        products. I work with React, TypeScript, Node.js and cloud tooling to
        ship clean code and great user experiences. Open to freelance projects
        and new opportunities, so get in touch.
      </p>
      <TerminalCarousel />
    </div>
  );
};

export default HomePage;
