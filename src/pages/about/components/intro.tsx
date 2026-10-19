import React from "react";

const Intro: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="max-w-xl text-base text-gray-400 lg:text-lg xl:text-xl">
    {children}
  </p>
);

export default Intro;
