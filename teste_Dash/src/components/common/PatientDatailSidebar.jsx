// src/components/common/PatientDetailSidebar.jsx
import React from 'react';
import { CloseIcon, UserIcon } from './Icons';
import { STATUS_COLORS } from '../../data/mockData';

// PatientDetailSidebar (Sidebar Dinâmica de Detalhes)
export const PatientDetailSidebar = ({ appointment, onClose }) => {
  if (!appointment) return null;

  const { patient, time, date, status, type } = appointment;
  const color = STATUS_COLORS[status]?.bg || '#bdc3c7';

  const formatAppointmentDate = (dateString) => {
    const d = new Date(dateString + 'T00:00:00'); // Adicionar T00:00:00 para evitar problemas de fuso
    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="detail-sidebar-overlay" onClick={onClose}>
      <style>{`
        .detail-sidebar-overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 50;
        }
        .detail-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          height: 100%;
          background: #fff;
          box-shadow: -4px 0 10px rgba(0, 0, 0, 0.15);
          transform: translateX(0);
          transition: transform 0.3s ease-in-out;
          z-index: 60;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 640px) {
          .detail-sidebar {
            width: 80%;
          }
        }
        .detail-header {
          padding: 20px;
          color: white;
          position: relative;
        }
        .detail-header h3 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: bold;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .close-btn .icon {
            width: 18px;
            height: 18px;
            stroke: white;
        }
        .detail-content {
          padding: 20px;
          flex-grow: 1;
          overflow-y: auto;
        }
        .detail-info-group {
          margin-bottom: 15px;
        }
        .detail-info-group label {
          display: block;
          font-weight: bold;
          color: #34495e;
          margin-bottom: 4px;
          font-size: 0.9rem;
        }
        .detail-info-group p {
          margin: 0;
          color: #2c3e50;
          background: #f4f6f8;
          padding: 8px;
          border-radius: 4px;
          font-size: 1rem;
        }
        .detail-notes {
            white-space: pre-wrap;
            min-height: 80px;
        }
      `}</style>
      <div className="detail-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header" style={{ backgroundColor: color }}>
            <h3>Detalhes da Consulta</h3>
            <button className="close-btn" onClick={onClose}>
                <CloseIcon />
            </button>
        </div>
        
        <div className="detail-content">
            {/* Informações da Consulta */}
            <div className="detail-info-group">
                <label>Paciente</label>
                <p>{patient.name}</p>
            </div>
            <div className="detail-info-group">
                <label>Data</label>
                <p>{formatAppointmentDate(date)}</p>
            </div>
            <div className="detail-info-group">
                <label>Hora</label>
                <p>{time}</p>
            </div>
            <div className="detail-info-group">
                <label>Status</label>
                <p>{status} - ({type})</p>
            </div>

            {/* Informações de Contato */}
            <h4 style={{ marginTop: '25px', marginBottom: '10px', color: '#34495e', borderBottom: '1px solid #ecf0f1', paddingBottom: '5px' }}>
                Contato
            </h4>
            <div className="detail-info-group">
                <label>Telefone</label>
                <p>{patient.phone}</p>
            </div>
            <div className="detail-info-group">
                <label>Email</label>
                <p>{patient.email}</p>
            </div>
            
            {/* Notas */}
            <h4 style={{ marginTop: '25px', marginBottom: '10px', color: '#34495e', borderBottom: '1px solid #ecf0f1', paddingBottom: '5px' }}>
                Notas do Paciente
            </h4>
            <div className="detail-info-group">
                <p className="detail-notes">{patient.notes || 'Sem notas registradas.'}</p>
            </div>
        </div>
      </div>
    </div>
  );
};