import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import SearchBar from "../../components/ui/SearchBar";
import { FaUser, FaChevronDown } from "react-icons/fa";

interface MenuItem {
  path: string;
  label: string;
  // icon will be a React component (from react-icons/fa)
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface UserInfo {
  name: string;
  email: string;
}

interface SidebarProps {
  setSidebarOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  menuItems: MenuItem[];
  userInfo?: UserInfo;
}

const Sidebar = ({
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
  menuItems,
  userInfo = { name: "Coordenador", email: "coordenador@faculdade.edu" },
}: SidebarProps) => {
  const location = useLocation();
  const [isLarge, setIsLarge] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 1024px)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsLarge(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return (
    <div className="lg:h-full">
      {isLarge ? (
        <aside
          // aumentada um pouco a largura no desktop de w-64 -> w-72
          className={`lg:flex lg:w-72 lg:static h-full transition-all duration-300 flex-col z-50 shrink-0`}
        >
          <div
            className="bg-white rounded-t-xl p-4 h-full flex flex-col overflow-hidden"
            style={{
              boxShadow: "0 6px 18px rgba(18,18,18,0.06)",
              border: "1px solid #E6E7EA",
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
            }}
          >
            {/* Card do Usuário */}
            <div
              className="bg-white rounded-lg p-3 mb-4 flex items-center gap-3"
              style={{ boxShadow: "0 2px 6px rgba(18,18,18,0.04)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"
                style={{
                  background:
                    "linear-gradient(90deg, #6A22FF 0%, #3A0CA3 100%)",
                }}
              >
                <FaUser className="w-8 h-8" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {userInfo.name}
                </div>
                <div className="text-xs text-[#6B7280] truncate">
                  {userInfo.email}
                </div>
              </div>

              <div className="text-[#6B7280] shrink-0">
                <FaChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Barra de Pesquisa */}
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Pesquisar"
              />
            </div>

            {/* Menu de Navegação */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`inline-flex items-center gap-3 w-full px-3 py-2 rounded-full transition ${
                          isActive
                            ? "bg-[#6A22FF] text-white font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span
                          className={`p-2 rounded-full ${
                            isActive ? "bg-white/10" : ""
                          }`}
                        >
                          {(() => {
                            const Icon = item.icon;
                            return <Icon className="w-6 h-6" />;
                          })()}
                        </span>
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>
      ) : null}

      {/* Bottom navigation for mobile */}
      <BottomNav menuItems={menuItems} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default Sidebar;
