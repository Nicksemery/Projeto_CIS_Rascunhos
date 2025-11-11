// src/components/layout/Sidebar.jsx
import React from 'react';
import { CalendarIcon, UserIcon } from '../common/Icons';

// Sidebar (Barra Lateral Principal - Navegação)
export const Sidebar = ({ activeView, setActiveView, isMobileMenuOpen, setIsMobileMenuOpen, patients }) => {
  const NavItem = ({ view, label, icon }) => (
    <button
      onClick={() => {
        setActiveView(view);
        if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
      }}
      className={activeView === view ? 'nav-item active' : 'nav-item'}
    >
      {icon}
      <span>{label}</span>
      <style>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          transition: background-color 0.2s, color 0.2s;
          width: 100%;
          text-align: left;
          font-weight: 500;
          color: #c0c0c0; /* Cinza claro */
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .nav-item:hover {
          background-color: #34495e; /* Azul Escuro */
          color: white;
        }
        .nav-item.active {
          background-color: #3498db; /* Azul Primário */
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        .nav-item .icon {
          width: 20px;
          height: 20px;
        }
      `}</style>
    </button>
  );

  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 40;
          width: 250px;
          height: 100%;
          background-color: #2c3e50; /* Azul Marinho Escuro */
          color: white;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
          box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 768px) {
          .sidebar {
            position: relative;
            transform: translateX(0);
            min-width: 250px;
            box-shadow: none;
          }
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid #34495e;
        }
        .sidebar-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ecf0f1;
          margin: 0;
        }
        .sidebar-header p {
          font-size: 0.8rem;
          color: #95a5a6;
          margin: 4px 0 0 0;
        }
        .sidebar-nav {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .patient-list-container {
          padding: 16px;
          margin-top: 16px;
          border-top: 1px solid #34495e;
          flex-grow: 1;
          overflow-y: auto;
        }
        .patient-list-container h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #ecf0f1;
          margin-bottom: 12px;
        }
        .patient-list-item {
          padding: 8px;
          font-size: 0.9rem;
          border-radius: 4px;
          transition: background-color 0.2s;
          cursor: pointer;
        }
        .patient-list-item:hover {
          background-color: #34495e;
        }
        .patient-list-item .name {
          font-weight: 500;
          display: block;
        }
        .patient-list-item .date {
          font-size: 0.75rem;
          color: #95a5a6;
        }
      `}</style>
      <div className="sidebar-header">
        <h2>PsyPanel</h2>
        <p>Dra. Helena Costa</p>
      </div>
      
      <nav className="sidebar-nav">
        <NavItem 
          view="dashboard" 
          label="Dashboard | Agenda" 
          icon={<CalendarIcon className="icon"/>} 
        />
        <NavItem 
          view="patients" 
          label="Meus Pacientes" 
          icon={<UserIcon className="icon"/>} 
        />
      </nav>

      {/* Lista de Pacientes Agendados Rápido */}
      {activeView === 'patients' && (
        <div className="patient-list-container">
          <h3>Agendados Próximos</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {patients.slice(0, 5).map(p => (
              <li key={p.id} className="patient-list-item">
                <span className="name">{p.name}</span>
                <span className="date">Última: {p.lastAppointment}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};