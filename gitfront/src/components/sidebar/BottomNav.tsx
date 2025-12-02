import React from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  path: string;
  label: string;
  // React component (from react-icons) which accepts SVG props like className/width/height
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Props {
  menuItems: MenuItem[];
  setSidebarOpen: (open: boolean) => void;
}

const BottomNav = ({ menuItems, setSidebarOpen }: Props) => {
  const location = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E6E7EA]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navegação inferior"
    >
      <ul className="flex justify-between items-center px-2 py-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <li key={item.path} className="flex-1 text-center">
              <Link
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={
                  "inline-flex flex-col items-center justify-center gap-1 w-full text-xs " +
                  (isActive ? "text-[#6A22FF]" : "text-[#6B7280]")
                }
                aria-label={item.label}
                title={item.label}
              >
                <Icon className="w-7 h-7" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
