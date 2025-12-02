import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickAction from "../../components/ui/QuickAction";

const EstagiarioDashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalPacientes: 8,
    sessoesAgendadas: 5,
    sessoesConcluidas: 23,
    relatoriosRecebidos: 2,
  });

  return (
    <div className="min-h-full pb-0">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-[#6B7280]">Bem-vindo de volta!</p>
      </header>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {/* Card Pacientes */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA]"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm text-[#6B7280] font-medium mb-2">
                Meus Pacientes
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-[#3A0CA3]">
                {stats.totalPacientes}
              </p>
            </div>
            <div className="p-2 lg:p-3 rounded-full shrink-0 ml-2 bg-[#6A22FF]">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Sessões Agendadas */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA] cursor-pointer hover:shadow-lg transition"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
          onClick={() => navigate("/estagiario/sessoes")}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm text-[#6B7280] font-medium mb-2">
                Sessões Agendadas
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-[#3A0CA3]">
                {stats.sessoesAgendadas}
              </p>
            </div>
            <div className="p-2 lg:p-3 rounded-full shrink-0 ml-2 bg-[#6A22FF]">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Sessões Concluídas */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA]"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm text-[#6B7280] font-medium mb-2">
                Sessões Concluídas
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-[#3A0CA3]">
                {stats.sessoesConcluidas}
              </p>
            </div>
            <div className="p-2 lg:p-3 rounded-full shrink-0 ml-2 bg-[#6A22FF]">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Relatórios Pendentes */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA] cursor-pointer hover:shadow-lg transition"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
          onClick={() => navigate("/estagiario/meus-relatorios")}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm text-[#6B7280] font-medium mb-2">
                Relatórios Recebidos
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-[#3A0CA3]">
                {stats.relatoriosRecebidos}
              </p>
            </div>
            <div className="p-2 lg:p-3 rounded-full shrink-0 ml-2 bg-[#6A22FF]">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div
        className="bg-white rounded-xl p-4 lg:p-6 border border-[#E6E7EA]"
        style={{ boxShadow: "0 2px 6px rgba(18,18,18,0.04)" }}
      >
        <h2 className="text-lg lg:text-xl font-semibold text-[#3A0CA3] mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAction
            title="Registrar Sessão"
            subtitle="Criar relatório de atendimento"
            onClick={() => navigate("/estagiario/registrar-sessao")}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </QuickAction>

          <QuickAction
            title="Ver Pacientes"
            subtitle="Acessar lista de pacientes"
            onClick={() => navigate("/estagiario/meus-pacientes")}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </QuickAction>

          <QuickAction
            title="Meus Relatórios"
            subtitle="Ver avaliações de desempenho"
            onClick={() => navigate("/estagiario/meus-relatorios")}
            className="sm:col-span-2 lg:col-span-1"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </QuickAction>
        </div>
      </div>
    </div>
  );
};

export default EstagiarioDashboard;
