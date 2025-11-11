// src/views/DashboardView.jsx
import React from 'react';
import { MonthlyCalendar } from '../components/calendar/MonthlyCalendar';
import { PotentialPatientsGrid } from '../components/calendar/PotentialPatientsGrid';
import { UserIcon } from '../components/common/Icons';
import { MOCK_POTENTIAL_SLOTS, STATUS_COLORS } from '../data/mockData';

// Subcomponente para a lista completa de pacientes
const PatientListView = ({ patients }) => (
    <div className="patient-list-view">
        <style>{`
            .patient-list-view { padding: 30px; }
            .patient-list-view h2 { color: #2c3e50; font-size: 1.8rem; margin-bottom: 20px; }
            .patient-card {
                background: #fff;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 10px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                border-left: 5px solid #3498db;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background 0.2s;
            }
            .patient-card:hover {
                background: #f7f9fc;
            }
            .patient-info h3 { margin: 0; font-size: 1.1rem; color: #2c3e50; }
            .patient-info p { margin: 2px 0 0 0; font-size: 0.9rem; color: #7f8c8d; }
            .patient-card .icon { width: 24px; height: 24px; stroke: #3498db; }
        `}</style>
        <h2>Lista Completa de Pacientes</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {patients.map(p => (
                <li key={p.id} className="patient-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <UserIcon />
                        <div className="patient-info">
                            <h3>{p.name}</h3>
                            <p>Tel: {p.phone}</p>
                        </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#95a5a6' }}>Última: {p.lastAppointment}</span>
                </li>
            ))}
        </ul>
        <p style={{ textAlign: 'center', marginTop: '30px', color: '#95a5a6', fontSize: '0.85rem' }}>
          Total de {patients.length} pacientes ativos.
        </p>
    </div>
);

// DashboardView (Layout Principal da Visualização)
export const DashboardView = ({ activeView, appointments, patients, onSelectAppointment }) => {
  // Switch entre as views
  if (activeView === 'patients') {
    return <PatientListView patients={patients} />;
  }

  // Dashboard View (padrão)
  return (
    <div className="dashboard-content">
        <style>{`
            .dashboard-content { padding: 30px; }
            .stat-cards-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            .stat-card {
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                border-left: 4px solid;
                transition: transform 0.2s;
            }
            .stat-card:hover {
                transform: translateY(-3px);
            }
            .stat-card p.title {
                margin: 0 0 5px 0;
                color: #7f8c8d;
                font-size: 0.9rem;
            }
            .stat-card p.value {
                margin: 0;
                font-size: 1.8rem;
                font-weight: 800;
                color: #2c3e50;
            }
        `}</style>
        <h2 style={{ color: '#2c3e50', fontSize: '2rem', fontWeight: 700, margin: '0 0 20px 0' }}>
            Dashboard Principal
        </h2>

        <div className="stat-cards-grid">
            {/* Card 1: Total de Agendamentos */}
            <div className="stat-card" style={{ borderLeftColor: '#3498db' }}>
                <p className="title">Agendamentos no Mês</p>
                <p className="value">{appointments.length}</p>
            </div>
            {/* Card 2: Confirmados */}
            <div className="stat-card" style={{ borderLeftColor: STATUS_COLORS['Confirmado'].bg }}>
                <p className="title">Sessões Confirmadas</p>
                <p className="value">
                    {appointments.filter(a => a.status === 'Confirmado').length}
                </p>
            </div>
            {/* Card 3: Pacientes Ativos */}
            <div className="stat-card" style={{ borderLeftColor: '#9b59b6' }}>
                <p className="title">Pacientes Ativos</p>
                <p className="value">{patients.length}</p>
            </div>
        </div>
      
      {/* Grade de Agenda Mensal */}
      <MonthlyCalendar 
        appointments={appointments} 
        patients={patients} 
        onSelectAppointment={onSelectAppointment} 
      />
      
      {/* Segundo Calendário de Demanda */}
      <PotentialPatientsGrid potentialSlots={MOCK_POTENTIAL_SLOTS} />
      
    </div>
  );
};