import TerminalCarousel from "./terminal-carousel";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 pt-3 lg:flex-row-reverse lg:items-center lg:justify-center lg:gap-12  lg:px-24">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-1">
        <h1 className="font-heading text-5xl font-medium text-white lg:text-7xl">
          Full_Stack Developer
        </h1>
        <p className="mt-4 p-3 pt-2 lg:text-xl text-lg text-gray-400 lg:p-0 lg:pt-4">
          Full-stack developer turning ideas into reliable, well-crafted web
          products. I work with React, TypeScript, Node.js and cloud tooling to
          ship clean code and great user experiences. Open to freelance projects
          and new opportunities, so get in touch.
        </p>
      </div>
      <div className="w-full lg:flex-1">
        <TerminalCarousel />
      </div>
    </div>
  );
};

export default HomePage;
