import { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "./DesktopSidebar";

export default function SidebarItem({ icon, text, route, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();

  // Determine active status based on current location
  const isActive = location.pathname === route;

  // Choose classes based on active status
  const activeClasses = isActive
    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
    : "hover:bg-indigo-50 text-gray-600";

  return (
    <li
      onClick={onClick} // This will be useful if you decide to add additional behavior
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${activeClasses}`}
    >
      <Link to={route} className="flex items-center w-full">
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-30 ml-3" : "w-0"}`}>
          {text}
        </span>
      </Link>

      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
      )}

      {/* Tooltip on hover when collapsed */}
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  alert: PropTypes.bool,
  onClick: PropTypes.func,
  active: PropTypes.bool, 
};

SidebarItem.defaultProps = {
  alert: false,
  onClick: () => {},
  active: false, 
};

