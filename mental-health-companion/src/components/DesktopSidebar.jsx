import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";


// Create and export SidebarContext
export const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null); // Track active item index

    const handleItemClick = (index) => {
        setActiveIndex(index); // Set the active item when clicked
    };

    return (
        <aside className="h-screen">
            <nav className={`h-full  flex flex-col bg-white border-r shadow-sm ${expanded ? "w-[200px]" : "w-auto"}`}>
                <div className="p-4 pb-2 flex justify-between items-center">
                    {/* Toggle Sidebar Button */}
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none transition-colors"
                        aria-label={expanded ? "Collapse Sidebar" : "Expand Sidebar"}
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>

                    {/* Logo Section */}
                    <img
                        src="https://img.logoipsum.com/243.svg"
                        className={`overflow-hidden transition-all ${expanded ? "w-25" : "w-0"}`}
                        alt="Logo"
                    />
                </div>

                {/* Provide SidebarContext to children */}
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1">
                        {React.Children.map(children, (child, index) =>
                            React.cloneElement(child, {
                                ...(activeIndex === index ? { active: "true" } : {active: "false"}), // Only add active if true
                                onClick: () => handleItemClick(index),
                            })
                        )}
                    </ul>
                </SidebarContext.Provider>

                {/* User Info Section */}
                <div className="border-t flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={`flex justify-between items-center ${expanded ? "w-52 ml-3" : "w-0"} overflow-hidden transition-all`}>
                        <div className="leading-4">
                            <h4 className="font-semibold">John Doe</h4>
                            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

// PropTypes for Sidebar
Sidebar.propTypes = {
    children: PropTypes.node.isRequired, // children can be any valid React node (components, text, etc.)
};