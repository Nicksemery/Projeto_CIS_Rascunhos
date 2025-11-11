// src/App.jsx
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { PatientDetailSidebar } from './components/common/PatientDatailSidebar';
import { DashboardView } from './views/DashbooardView';
import { Icon, MenuIcon } from './components/common/Icons';
import { MOCK_APPOINTMENTS, MOCK_PATIENTS } from './data/mockData';

// Componente Principal App
const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Estado para o paciente selecionado

  // Função para fechar a sidebar de detalhes
  const handleCloseDetail = useCallback(() => setSelectedAppointment(null), []);
  
  // Função para abrir a sidebar de detalhes
  const handleSelectAppointment = useCallback((appData) => setSelectedAppointment(appData), []);

  return (
    <div className="app-main-container">
      <style>{`
        .app-main-container {
          display: flex;
          height: 100vh;
          font-family: 'Arial', sans-serif;
          background-color: #ecf0f1; /* Fundo cinza claro */
          overflow: hidden; /* Evita scroll desnecessário no corpo principal */
        }
        .main-content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          border-bottom: 1px solid #ddd;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          z-index: 20;
          min-height: 60px;
        }
        .header-title {
            color: #2c3e50;
            font-size: 1.3rem;
            font-weight: 600;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          background-color: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
        }
        .mobile-menu-btn {
          padding: 8px;
          border: none;
          background: #f4f6f8;
          border-radius: 6px;
          cursor: pointer;
          margin-right: 15px;
          display: block;
        }
        @media (min-width: 768px) {
            .mobile-menu-btn { display: none; }
        }
        .mobile-menu-btn .icon {
            width: 24px;
            height: 24px;
            stroke: #2c3e50;
        }
        .main-scroll-area {
            flex-grow: 1;
            overflow-y: auto;
            padding: 20px;
        }
      `}</style>
      
      {/* 5.1 Sidebar (Navegação Principal) */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        patients={MOCK_PATIENTS}
      />
      
      {/* 5.2 Overlay do Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay" 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 30 }}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* 5.3 Conteúdo Principal */}
      <div className="main-content-area">
        
        {/* Header do Conteúdo */}
        <header className="app-header">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
            >
              <MenuIcon />
            </button>
            <h1 className="header-title">
              {activeView === 'dashboard' ? 'Agenda e Visão Geral' : 'Gestão de Pacientes'}
            </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Olá, Dra. Helena!</span>
            <div className="user-avatar">HC</div>
          </div>
        </header>

        {/* Área de Visualização Principal com Scroll */}
        <main className="main-scroll-area">
          <DashboardView 
            activeView={activeView} 
            appointments={MOCK_APPOINTMENTS} 
            patients={MOCK_PATIENTS}
            onSelectAppointment={handleSelectAppointment}
          />
        </main>
      </div>
      
      {/* 5.4 Sidebar Dinâmica de Detalhes do Paciente */}
      {selectedAppointment && (
          <PatientDetailSidebar 
              appointment={selectedAppointment} 
              onClose={handleCloseDetail} 
          />
      )}
    </div>
  );
};

export default App;