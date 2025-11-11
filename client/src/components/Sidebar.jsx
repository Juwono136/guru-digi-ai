// Assets and icons
import { FiX } from "react-icons/fi";
import LogoImg from "../assets/logo.png";

const NavLink = ({ icon, title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {icon}
      <span className="ml-3">{title}</span>
    </button>
  );
};

const Sidebar = ({ activeTab, onTabChange, isSidebarOpen, setIsSidebarOpen, navLinks }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 px-4 py-6 bg-white shadow-lg
                    transform transition-transform duration-300 ease-in-out print:hidden
                    lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center">
            <img src={LogoImg} alt="logo image" className="h-6 w-6" />
            <span className="ml-2 text-xl font-bold text-gray-700">Guru Digi AI</span>
          </div>

          {/* Tombol Close (hanya di mobile version) */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <hr className="my-4 border-gray-200 border" />

        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.tabName}
              icon={link.icon}
              title={link.title}
              isActive={activeTab === link.tabName}
              onClick={() => {
                onTabChange(link.tabName);
                setIsSidebarOpen(false);
              }}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
