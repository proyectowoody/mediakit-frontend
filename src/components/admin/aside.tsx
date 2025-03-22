interface SidebarProps {
    isAsideOpen: boolean;
    handleNavigation: (path: string) => void;
    navLinks: { path: string; label: string }[];
    showModal: () => void;
    isLogged: boolean;
}

const Sidebar = ({
    isAsideOpen,
    handleNavigation,
    navLinks,
}: SidebarProps) => (
    <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
            isAsideOpen ? "translate-x-0" : "-translate-x-full"
        } border-r bg-gradient-to-r from-[#4E6E5D] via-[#6E9475] to-[#4E6E5D] shadow-md`}
        aria-label="Sidebar"
    >
        <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between bg-gradient-to-r from-[#4E6E5D] via-[#6E9475] to-[#4E6E5D]">
            <ul className="space-y-2 font-medium">
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handleNavigation(link.path)}
                            className="transition duration-300 transform hover:scale-105 flex items-center p-2 text-[#FAF3E0] rounded-lg bg-[#6E9475] hover:bg-[#5C8465] w-full text-left"
                        >
                            <span className="flex-1 ml-3 whitespace-nowrap" data-translate>{link.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </aside>
);

export default Sidebar;
