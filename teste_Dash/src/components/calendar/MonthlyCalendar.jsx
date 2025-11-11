// src/components/calendar/MonthlyCalendar.jsx
import React, { useState, useMemo } from 'react';
import { getDaysInMonth } from '../../utils/dateUtils';
import { ArrowLeft, ArrowRight } from '../common/Icons';
import { STATUS_COLORS, MONTH_NAMES_PT, WEEK_DAYS_PT } from '../../data/mockData';

// MonthlyCalendar (Componente de Agenda Mensal)
export const MonthlyCalendar = ({ appointments, patients, onSelectAppointment }) => {
  // Fixar o mês inicial para demonstração
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 10)); // Nov 10, 2025
  
  const patientMap = useMemo(() => 
    patients.reduce((acc, p) => ({ ...acc, [p.id]: p }), {}), [patients]
  );
  
  // Agrupamento de agendamentos por dia do mês visualizado
  const appointmentsByDay = useMemo(() => {
    const map = new Map();
    appointments.forEach(app => {
      // Verifica se o agendamento pertence ao mês e ano atual
      const appDate = new Date(app.date);
      if (
        appDate.getMonth() === currentDate.getMonth() &&
        appDate.getFullYear() === currentDate.getFullYear()
      ) {
        const dayKey = appDate.getDate(); // Chave: 1 a 31
        if (!map.has(dayKey)) {
          map.set(dayKey, []);
        }
        map.get(dayKey).push({ ...app, patient: patientMap[app.patientId] });
      }
    });
    return map;
  }, [appointments, patientMap, currentDate]);

  const daysInMonth = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  const handleMonthChange = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + direction, 1);
      return newDate;
    });
  };

  const today = new Date();
  const isToday = (date) => date && date.getDate() === today.getDate() && 
                             date.getMonth() === today.getMonth() && 
                             date.getFullYear() === today.getFullYear();

  return (
    <div className="monthly-calendar-container">
      <style>{`
        .monthly-calendar-container {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          padding: 20px;
          margin-top: 20px;
          overflow: hidden;
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .calendar-header h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c3e50;
        }
        .nav-button {
          background: #3498db;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-button:hover {
          background: #2980b9;
          transform: scale(1.05);
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
        }
        .day-header {
          padding: 10px 5px;
          text-align: center;
          font-weight: 600;
          color: #34495e;
          background-color: #f4f6f8;
          border-right: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          font-size: 0.9rem;
        }
        .day-cell {
          height: 120px;
          padding: 5px;
          border-right: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          position: relative;
          background-color: #fff;
          overflow-y: auto;
        }
        .day-cell.inactive {
          background-color: #f7f9fb;
          color: #b0b0b0;
        }
        .day-cell-number {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2c3e50;
          position: absolute;
          top: 5px;
          right: 5px;
          line-height: 1;
        }
        .day-cell.today .day-cell-number {
          background-color: #e74c3c;
          color: white;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .appointment-badge {
          font-size: 0.7rem;
          padding: 3px 6px;
          border-radius: 4px;
          margin-bottom: 3px;
          cursor: pointer;
          transition: transform 0.15s;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .appointment-badge:hover {
          transform: translateX(3px);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      <div className="calendar-header">
        <button className="nav-button" onClick={() => handleMonthChange(-1)}>
          <ArrowLeft size={18} />
        </button>
        <h3>
          {MONTH_NAMES_PT[currentDate.getMonth()]} de {currentDate.getFullYear()}
        </h3>
        <button className="nav-button" onClick={() => handleMonthChange(1)}>
          <ArrowRight size={18} />
        </button>
      </div>
      
      <div className="calendar-grid">
        {/* Cabeçalho dos Dias da Semana */}
        {WEEK_DAYS_PT.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
        
        {/* Células dos Dias */}
        {daysInMonth.map((day, index) => {
          const isInactive = !day;
          const isCurrentDay = day && isToday(day);
          const dayAppointments = day ? appointmentsByDay.get(day.getDate()) || [] : [];
          
          return (
            <div 
              key={index} 
              className={`day-cell ${isInactive ? 'inactive' : ''} ${isCurrentDay ? 'today' : ''}`}
            >
              {day && (
                <>
                  <div className="day-cell-number">{day.getDate()}</div>
                  <div style={{ marginTop: '30px' }}>
                    {dayAppointments.map(app => {
                      const colorStyle = {
                        backgroundColor: STATUS_COLORS[app.status]?.bg || '#bdc3c7',
                        color: STATUS_COLORS[app.status]?.text || '#2c3e50',
                        border: `1px solid ${STATUS_COLORS[app.status]?.border || '#95a5a6'}`
                      };
                      return (
                        <div 
                          key={app.id}
                          className="appointment-badge"
                          style={colorStyle}
                          onClick={() => onSelectAppointment(app)}
                          title={`${app.patient.name} (${app.time})`}
                        >
                          {app.time} - {app.patient.name}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};