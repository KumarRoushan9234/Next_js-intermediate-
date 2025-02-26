import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-slate-400 shadow-md py-4 px-6 rounded-b-lg w-full flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Taskify
      </h1>
    </nav>
  );
};

export default Navbar;
