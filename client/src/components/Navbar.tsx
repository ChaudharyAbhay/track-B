import React from "react";

const Navbar = () => (
  <nav className="fixed top-8 left-1/2 -translate-x-1/2 flex gap-8 px-10 py-4 rounded-full shadow-2xl border border-white/30 dark:border-white/20 bg-white/30 dark:bg-white/10 backdrop-blur-xl backdrop-saturate-150 z-20
    before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-indigo-400/30 before:via-pink-400/20 before:to-purple-400/30 before:blur-lg before:-z-10
    transition-all duration-300 hover:scale-[1.025] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
    <a href="#" className="font-semibold text-lg text-gray-800 dark:text-gray-100 hover:text-indigo-500 dark:hover:text-indigo-400 transition drop-shadow-sm">Home</a>
    <a href="#page1" className="font-semibold text-lg text-gray-800 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400 transition drop-shadow-sm">Page1</a>
    <a href="#page2" className="font-semibold text-lg text-gray-800 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400 transition drop-shadow-sm">Page2</a>
    <a href="#page3" className="font-semibold text-lg text-gray-800 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400 transition drop-shadow-sm">Page3</a>
    <a href="#page4" className="font-semibold text-lg text-gray-800 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400 transition drop-shadow-sm">Page4</a>
    <a href="#about" className="font-semibold text-lg text-gray-800 dark:text-gray-100 hover:text-purple-500 dark:hover:text-purple-400 transition drop-shadow-sm">About</a>
    <a href="#contact" className="font-semibold text-lg text-gray-800 dark:text-gray-100 hover:text-cyan-500 dark:hover:text-cyan-400 transition drop-shadow-sm">Contact</a>
  </nav>
);

export default Navbar; 