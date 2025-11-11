// src/utils/dateUtils.js

/** Obtém todos os dias do mês para o calendário */
export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Dom) a 6 (Sáb)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  // Preencher dias vazios do mês anterior (para alinhamento)
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Preencher os dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};