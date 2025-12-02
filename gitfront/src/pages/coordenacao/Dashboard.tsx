import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import QuickAction from "../../components/ui/QuickAction";

const Dashboard = () => {
  const [stats] = useState({
    totalEstagiarios: 12,
    totalPacientes: 45,
    sessoesPendentes: 8,
    sessoesAprovadas: 120,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isSubpage = location.pathname !== "/coordenacao/dashboard";

  if (isSubpage) {
    // Renderiza diretamente o <Outlet /> (para /dashboard/agendar-consulta e futuras rotas)
    return <Outlet />;
  }

  return (
    <div className="min-h-full pb-0">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-[#6B7280]">Visão geral</p>
      </header>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {/* Card Estagiários */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA]"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm text-[#6B7280] font-medium mb-2">
                Total de Estagiários
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-[#3A0CA3]">
                {stats.totalEstagiarios}
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Pacientes */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA]"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm text-[#6B7280] font-medium mb-2">
                Total de Pacientes
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Sessões Pendentes */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA] cursor-pointer hover:shadow-lg transition"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
          onClick={() => navigate("/coordenacao/sessoes-pendentes")}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm text-[#6B7280] font-medium mb-2">
                Sessões Agendadas
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-[#3A0CA3]">
                {stats.sessoesPendentes}
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Sessões Aprovadas */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA]"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm text-[#6B7280] font-medium mb-2">
                Sessões Aprovadas
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-[#3A0CA3]">
                {stats.sessoesAprovadas}
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
            title="Cadastrar Estagiário"
            subtitle="Criar nova conta de estagiário"
            onClick={() => navigate("cadastrar-estagiario")}
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </QuickAction>

          <QuickAction
            title="Agendar Consulta"
            subtitle="Selecionar paciente e horário"
            onClick={() => navigate("agendar-consulta")}
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </QuickAction>

          <QuickAction
            title="Checar Sessões"
            subtitle="Verificar sessões agendadas"
            className="sm:col-span-2 lg:col-span-1"
            onClick={() => navigate("/coordenacao/sessoes-pendentes")}
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </QuickAction>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
