import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu, X } from "lucide-react";
import { sidebarData } from "../data/sidebar";

function MobileNavItem({ icon, text, route, alert, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === route;
  const activeClasses = isActive
    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
    : "hover:bg-indigo-50 text-gray-600";

  return (
    <li onClick={onClick} className={`flex items-center py-2 px-3 my-1 rounded-md ${activeClasses}`}>
      <Link to={route} className="flex items-center w-full">
        {icon}
        <span className="ml-3">{text}</span>
      </Link>
      {alert && <div className="w-2 h-2 bg-indigo-400 rounded-full ml-auto" />}
    </li>
  );
}

MobileNavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  alert: PropTypes.bool,
  onClick: PropTypes.func,
};

MobileNavItem.defaultProps = {
  alert: false,
  onClick: () => {},
};

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <img src="https://img.logoipsum.com/243.svg" alt="Logo" className="h-8 ml-4" />
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md border-t">
          <ul className="p-4">
            {sidebarData.map((section, index) => (
              <div key={index}>
                <ul>
                  {section.items.map((item, itemIndex) => (
                    <MobileNavItem
                      key={itemIndex}
                      icon={<item.icon size={20} />}
                      text={item.text}
                      route={item.route}
                      alert={item.alert}
                      onClick={closeMenu}
                    />
                  ))}
                </ul>
                {index === 0 && <hr className="my-3 border-gray-200" />}
              </div>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
