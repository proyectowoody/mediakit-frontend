import logoImage from "../../assets/img/logo.png";
import { FaUser, FaGlobe } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const NavBar = ({ toggleAside, showModal, changeLanguage }: {
  toggleAside: () => void; showModal: () => void; changeLanguage: (lng: string) => void;
}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsLanguageDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b shadow-md bg-gradient-to-r from-[#4E6E5D] via-[#6E9475] to-[#4E6E5D]">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleAside}
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-[#4E6E5D] rounded-lg hover:bg-[#D4C9B0] bg-[#FAF3E0] focus:outline-none focus:ring-2 focus:ring-[#D4C9B0]"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="/inicio" className="flex ml-2 md:mr-24">
              <img
                src={logoImage}
                className="h-12 rounded-full bg-white"
                alt="FlowBite Logo"
              />
            </a>
          </div>

          <div className="flex items-center space-x-4">

            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center text-[#FAF3E0] hover:text-[#D4C9B0] focus:outline-none"
              >
                <FaGlobe className="h-5 w-5" />
              </button>
              {isLanguageDropdownOpen && (
                <div ref={languageDropdownRef} className="absolute right-0 mt-2 w-40 bg-[#4E6E5D] rounded-md shadow-lg">
                  <button onClick={() => changeLanguage('es')} className="block px-4 py-2 text-left w-full text-[#FAF3E0] hover:bg-[#5C8465]" data-translate>
                    🇪🇸 Español
                  </button>
                  <button onClick={() => changeLanguage('en')} className="block px-4 py-2 text-left w-full text-[#FAF3E0] hover:bg-[#5C8465]" data-translate>
                    🇺🇸 Inglés
                  </button>
                  <button onClick={() => changeLanguage('fr')} className="block px-4 py-2 text-left w-full text-[#FAF3E0] hover:bg-[#5C8465]" data-translate>
                    🇫🇷 Francés
                  </button>
                  <button onClick={() => changeLanguage('de')} className="block px-4 py-2 text-left w-full text-[#FAF3E0] hover:bg-[#5C8465]" data-translate>
                    🇩🇪 Alemán
                  </button>
                  <button onClick={() => changeLanguage('pt')} className="block px-4 py-2 text-left w-full text-[#FAF3E0] hover:bg-[#5C8465]" data-translate>
                    🇵🇹 Portugués
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-[#FAF3E0] focus:outline-none"
              >
                <FaUser className="h-5 w-5" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#4E6E5D] rounded-md shadow-lg z-50">
                  <ul className="py-2 text-[#FAF3E0]">
                    <li className="mb-3">
                      <a href="cuenta-admin">
                        <button
                          className="flex items-center p-2 text-white rounded-lg bg-[#6E9475] w-full text-left transition duration-300 hover:bg-[#4A7A5A] hover:text-[#FAF3E0]"
                          data-translate
                        >
                          Cuenta
                        </button>
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={showModal}
                        className="flex items-center p-2 text-white rounded-lg bg-[#D9534F] w-full text-left transition duration-300 hover:bg-[#B52A26]"
                        data-translate
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
