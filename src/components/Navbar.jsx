import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 ">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center md:justify-between gap-3">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="../../Assignment-8-asset/assets/logo.png"
            alt="HERO.IO"
            className="w-8 h-8"
          />
          <a href="/">
            <span className="font-semibold text-lg text-purple-600">
              HERO.IO
            </span>
          </a>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <a
            href="/"
            className="text-purple-600 font-medium active:bg-purple-700"
          >
            Home
          </a>
          <a
            href="/Apps"
            className="text-gray-700 hover:text-purple-600 active:bg-purple-700"
          >
            Apps
          </a>
          <a
            href="/Installation"
            className="text-gray-700 hover:text-purple-600 active:bg-purple-700"
          >
            Installation
          </a>
        </div>

        <a
          href="https://github.com/Prosunsajal4"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:opacity-90 transition w-auto"
        >
          <FaGithub size={16} />
          Contribute
        </a>
      </div>
    </nav>
  );
}
