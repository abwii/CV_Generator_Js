import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false); // Gérer l'état du menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterner l'état du menu
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-[#162C04] p-6">
        {/* Logo à gauche */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <div className="rounded-full h-16 w-16 flex items-center justify-center bg-[#D9D9D9]">
            Logo
          </div>
        </div>

        {/* Bouton Menu pour mobile */}
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* Liens à droite */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-end`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 text-white">
            <li className="">
              <Link to={"/mycv"} className="text-white hover:text-gray-300 ">
                My CV
              </Link>
            </li>
            <li>
              <Link
                to={"/myaccount"}
                className="text-white hover:text-gray-300 lg:m-3"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link to={"/allcvs"} className="text-white hover:text-gray-300">
                All CVs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
