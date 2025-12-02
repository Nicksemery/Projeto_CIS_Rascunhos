import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import MainContent from "./MainContent";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaUsers,
  FaCalendarCheck,
  FaFileAlt,
} from "react-icons/fa";

const CoordenacaoLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    {
      path: "/coordenacao/dashboard",
      label: "Dashboard",
      icon: FaTachometerAlt,
    },
    {
      path: "/coordenacao/estagiarios",
      label: "Monitorar Estagiários",
      icon: FaUserGraduate,
    },
    {
      path: "/coordenacao/pacientes",
      label: "Gerenciar Pacientes",
      icon: FaUsers,
    },
    {
      path: "/coordenacao/autorizar-sessoes",
      label: "Autorizar Sessões",
      icon: FaCalendarCheck,
    },
    { path: "/coordenacao/relatorios", label: "Relatórios", icon: FaFileAlt },
  ];

  return (
    <div
      className="h-screen pt-4 lg:pt-6 px-4 lg:px-6 pb-4 lg:pb-0 overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(180deg, #6A22FF 0%, #3A0CA3 100%)",
      }}
    >
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Container principal com grid: mobile column so MainContent fills the viewport */}
      <div className="max-w-full mx-auto w-full flex flex-col lg:flex-row gap-4 lg:gap-6 flex-1 overflow-hidden">
        <Sidebar
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          menuItems={menuItems}
        />

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
};

export default CoordenacaoLayout;
