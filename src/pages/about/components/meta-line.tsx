import React from "react";

const MetaLine: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs text-neutral-500 lg:text-sm">{children}</p>
);

export default MetaLine;
