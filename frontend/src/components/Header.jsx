import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';

function Header() {
  const [user, setUser] = useState(null);
  const { getUserInfos, logout } = useContext(UserContext);

  useEffect(() => {
    const userInfo = getUserInfos();
    setUser(userInfo);
  }, [getUserInfos]); // Dépendance pour réexécuter l'effet si getUserInfos change

  const [isOpen, setIsOpen] = useState(false); 
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterner l'état du menu
  };

 // Récupérer les infos de l'utilisateur
  const logoText = user ? `${user.firstname.charAt(0)}${user.lastname.charAt(0)}` : ''; // Obtenir les initiales

  return (
    <>
      <nav className="font-imbue font-light text-xl text-white flex items-center justify-between flex-wrap bg-[#162C04] p-3">
        {/* Logo à gauche */}
        {user && ( // Affiche le logo seulement si l'utilisateur est connecté
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <div className="rounded-full h-16 w-16 flex items-center justify-center bg-[#D9D9D9]">
              {logoText} {/* Afficher les initiales si l'utilisateur est connecté */}
            </div>
            <p className="m-3">{user.firstname}{" "}{user.lastname}</p>
          </div>
        )}

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
          <ul className="flex flex-col lg:flex-row lg:space-x-6 ">
          <li className="p-3">
              <Link to={"/allcvs"} className="hover:text-gray-300">
                All CVs
              </Link>
            </li>
            {!user && ( // Affiche le lien Home seulement si l'utilisateur n'est pas connecté
              <li className="p-3">
                <Link to={"/"} className="hover:text-gray-300">
                  Home
                </Link>
              </li>
            )}
            {user && ( // Affiche les liens My CV et My Account seulement si l'utilisateur est connecté
              <>
                <li className="p-3">
                  <Link to={"/mycv"} className="hover:text-gray-300">
                    My CV
                  </Link>
                </li>
                <li className="p-3">
                  <Link to={"/myaccount"} className="hover:text-gray-300">
                    My Account
                  </Link>
                </li>
                <li className="p-3">
                <button
                  onClick={logout} // Appelle la fonction de déconnexion
                  className="bg-red-500 text-white px-2  rounded hover:bg-red-600"
                >
                  Déconnexion
                </button>
              </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
