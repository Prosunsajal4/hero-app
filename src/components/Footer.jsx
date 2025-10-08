import React from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#050d1a] to-[#0a1a2f] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center border-b border-gray-700/60">
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <img
            src="../../Assignment-8-asset/assets/logo.png"
            alt="HERO.IO"
            className="w-10 h-10 drop-shadow-lg"
          />
          <div>
            <h1 className="text-lg font-semibold text-white tracking-wide">
              HERO.IO
            </h1>
            <p className="text-sm text-gray-400">
              Empowering your digital world
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-6 md:mb-0">
          <a href="#" className="hover:text-purple-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Features
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Pricing
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition duration-300"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition duration-300"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition duration-300"
          >
            <FaFacebook size={18} />
          </a>
        </div>
      </div>

      <div className="py-5 text-center text-sm text-gray-500">
        <p>
          © 2025 <span className="text-purple-400 font-medium">HERO.IO</span> —
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
