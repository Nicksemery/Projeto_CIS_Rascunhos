// src/data/mockData.js

export const MOCK_PATIENTS = [
  { id: 'p1', name: 'Maria Santos', phone: '(11) 98765-4321', email: 'maria.santos@email.com', lastAppointment: 'Ontem', notes: 'Ansiedade generalizada, sessões semanais.' },
  { id: 'p2', name: 'João Oliveira', phone: '(21) 91234-5678', email: 'joao.o@email.com', lastAppointment: '3 dias atrás', notes: 'Luto e depressão. Indicado para terapia breve.' },
  { id: 'p3', name: 'Fernanda Lima', phone: '(31) 95555-1234', email: 'fernanda.lima@email.com', lastAppointment: 'Semana passada', notes: 'Questões de relacionamento. Sessões quinzenais.' },
  { id: 'p4', name: 'Roberto Almeida', phone: '(41) 97777-5678', email: 'roberto.a@email.com', lastAppointment: 'Hoje', notes: 'Ajuste pós-pandemia. Foco em planejamento futuro.' },
];

// Mapeando dados mockados para um mês específico (Novembro 2025)
export const MOCK_APPOINTMENTS = [
  // Segundas
  { id: 'a1', patientId: 'p1', date: '2025-11-10', time: '09:00', status: 'Confirmado', type: 'Foco' },
  { id: 'a2', patientId: 'p2', date: '2025-11-03', time: '10:00', status: 'Cancelado', type: 'Dúvidas' },
  { id: 'a8', patientId: 'p4', date: '2025-11-24', time: '17:00', status: 'Confirmado', type: 'Consulta' },
  // Terças
  { id: 'a3', patientId: 'p3', date: '2025-11-11', time: '14:00', status: 'Pendente', type: 'Avaliação' },
  { id: 'a9', patientId: 'p3', date: '2025-11-25', time: '10:00', status: 'Confirmado', type: 'Foco' },
  // Quartas
  { id: 'a4', patientId: 'p4', date: '2025-11-12', time: '11:00', status: 'Confirmado', type: 'Consulta' },
  // Quintas
  { id: 'a5', patientId: 'p1', date: '2025-11-13', time: '16:00', status: 'Pendente', type: 'Foco' },
  // Sextas
  { id: 'a6', patientId: 'p2', date: '2025-11-14', time: '09:00', status: 'Confirmado', type: 'Consulta' },
  { id: 'a7', patientId: 'p4', date: '2025-11-14', time: '15:00', status: 'Confirmado', type: 'Consulta' },
  // Finais de semana
  { id: 'a10', patientId: 'p1', date: '2025-11-09', time: '10:00', status: 'Pendente', type: 'Especial' },
];

// Slots de potencial demanda (não mudam com o mês, representam padrões)
export const MOCK_POTENTIAL_SLOTS = [
  { day: 'Seg', time: '14:00', count: 3, description: '3 pacientes buscam este horário' },
  { day: 'Ter', time: '09:00', count: 5, description: '5 pacientes buscam este horário' },
  { day: 'Qua', time: '15:00', count: 2, description: '2 pacientes buscam este horário' },
];

export const WEEK_DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const MONTH_NAMES_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Mapeamento de status para cores CSS
export const STATUS_COLORS = {
  'Confirmado': { bg: '#2ecc71', border: '#27ae60', text: 'white' }, // Verde
  'Pendente': { bg: '#f1c40f', border: '#f39c12', text: '#333' },    // Amarelo
  'Cancelado': { bg: '#e74c3c', border: '#c0392b', text: 'white' },   // Vermelho
  'Especial': { bg: '#9b59b6', border: '#8e44ad', text: 'white' },   // Roxo
};