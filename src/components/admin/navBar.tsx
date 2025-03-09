import logoImage from "../../assets/img/logo.png";
import { FaUser } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const NavBar = ({ toggleAside, showModal }: { toggleAside: () => void; showModal: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
            <a href="/home-admin" className="flex ml-2 md:mr-24">
              <img
                src={logoImage}
                className="h-12 rounded-full bg-white"
                alt="FlowBite Logo"
              />
            </a>
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
                  <li>
                    <button
                      onClick={showModal}
                      className="transition duration-300 transform hover:scale-105 flex items-center p-2 text-[#FAF3E0] rounded-lg bg-[#6E9475] hover:bg-[#5C8465] w-full text-left"
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
    </nav>
  );
};

export default NavBar;
