import { Outlet } from "react-router-dom";

import DesktopSidebar from "../components/DesktopSidebar";
import MobileNav from "../components/MobileNav";
import SidebarItem from "../components/SideItem";
import { sidebarData } from "../data/sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Responsive Layout: Separate UI for Desktop and Mobile */}
      {/* Desktop View */}
      <div className="hidden md:flex w-full">
        {/* Desktop Sidebar */}
          <DesktopSidebar>
            {sidebarData.map((section, index) => (
              <div key={index}>
                <ul className="px-3">
                  {section.items.map((item, itemIndex) => (
                    <SidebarItem
                      key={itemIndex}
                      icon={<item.icon size={20} />}
                      text={item.text}
                      route={item.route}
                      alert={item.alert}
                    />
                  ))}
                </ul>
                {index === 0 && <hr className="my-3 border-gray-200" />}
              </div>
            ))}
          </DesktopSidebar>
        {/* Desktop Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col w-full">
        <MobileNav />
        <main className="md:hidden flex-1 mt-[72.3px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

