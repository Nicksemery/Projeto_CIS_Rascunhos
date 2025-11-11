// src/components/calendar/PotentialPatientsGrid.jsx
import React, { useMemo } from 'react';

// PotentialPatientsGrid (Segundo Calendário - Demanda)
export const PotentialPatientsGrid = ({ potentialSlots }) => {
    // Mantendo a estrutura de grade semanal para o segundo calendário de 'potenciais',
    // pois representa a grade de disponibilidade do psicólogo (horários livres) e a demanda,
    // que é melhor visualizada em formato de grade de tempo.
    const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    const WEEK_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

    const demandMatrix = useMemo(() => {
        const matrix = {};
        WEEK_DAYS.forEach(day => matrix[day] = {});
        potentialSlots.forEach(slot => {
            matrix[slot.day][slot.time] = slot;
        });
        return matrix;
    }, [potentialSlots]);

    // Estilos internos (para evitar repetição e usar classes CSS)
    const gridStyles = `
        .potential-grid-container {
            background-color: #f7f9fc; /* Cor de fundo suave */
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            padding: 20px;
            margin-top: 30px;
            overflow-x: auto;
            border: 1px solid #e0e0e0;
        }
        .demand-grid-header {
          display: grid;
          grid-template-columns: 80px repeat(5, 1fr);
          padding: 8px 0;
          border-bottom: 2px solid #ddd;
          min-width: 700px;
        }
        .demand-grid-row {
          display: grid;
          grid-template-columns: 80px repeat(5, 1fr);
          border-bottom: 1px solid #eee;
          min-width: 700px;
        }
        .demand-block {
            height: 60px;
            padding: 6px;
            margin: 4px;
            border-radius: 4px;
            background-color: #e6f7ff; /* Fundo azul claro para demanda */
            border: 1px solid #91d5ff;
            color: #1890ff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 0.7rem;
            font-weight: 500;
            cursor: default;
        }
        .demand-count {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 2px;
        }
        .low-demand { background-color: #fffbe6 !important; border-color: #ffe58f !important; color: #faad14 !important; }
        .high-demand { background-color: #ffccc7 !important; border-color: #ff7a45 !important; color: #cf1322 !important; }
    `;

    return (
        <div className="potential-grid-container">
            <style>{gridStyles}</style>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2c3e50', marginBottom: '16px' }}>
                Agenda de Disponibilidade e Demanda Potencial
            </h3>
            
            <div className="demand-grid-header">
                <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '0.9rem', color: '#34495e', padding: '8px 0' }}>Hora</div>
                {WEEK_DAYS.map(day => (<div key={day} className="day-header" style={{ border: 'none' }}>{day}</div>))}
            </div>

            {TIME_SLOTS.map(time => (
                <div key={time} className="demand-grid-row">
                    <div className="time-slot-label" style={{ backgroundColor: '#ecf0f1', color: '#2c3e50', fontWeight: '500', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #ddd' }}>{time}</div>
                    
                    {WEEK_DAYS.map(day => {
                        const slotData = demandMatrix[day][time];
                        const count = slotData ? slotData.count : 0;
                        let demandClass = '';
                        if (count > 4) demandClass = 'high-demand';
                        else if (count > 0) demandClass = 'low-demand';

                        return (
                            <div key={`${day}-${time}`} style={{ padding: '2px' }}>
                                {count > 0 ? (
                                    <div className={`demand-block ${demandClass}`} title={slotData.description}>
                                        <div className="demand-count">{count}</div>
                                        <div>{slotData.description.split(' ')[0]}</div>
                                    </div>
                                ) : (
                                    <div className="demand-block" style={{ backgroundColor: '#f9f9f9', border: '1px dashed #ddd', color: '#ccc' }}>
                                        Livre
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};  