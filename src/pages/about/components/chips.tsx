import React from "react";

const Chips: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li
        key={item}
        className="rounded-full border border-white/40 px-3 py-1 text-xs text-white"
      >
        {item}
      </li>
    ))}
  </ul>
);

export default Chips;
