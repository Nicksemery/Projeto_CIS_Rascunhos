import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendar, FaClock, FaUser, FaPlus } from "react-icons/fa";
import SearchBar from "../../components/ui/SearchBar";
import BackButton from "../../components/ui/BackButton";

type Sessao = {
  id: number;
  paciente: string;
  data: string;
  horario: string;
  tipo: string;
  sala: string;
  status: "Agendada" | "Concluída" | "Cancelada";
};

const MinhasSessoes = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("Todas");

  // Mock de dados
  const [sessoes] = useState<Sessao[]>([
    {
      id: 1,
      paciente: "Mariana Oliveira",
      data: "05/12/2025",
      horario: "14:00",
      tipo: "Terapia Individual",
      sala: "Sala 1",
      status: "Agendada",
    },
    {
      id: 2,
      paciente: "Pedro Almeida",
      data: "06/12/2025",
      horario: "10:00",
      tipo: "Avaliação Psicológica",
      sala: "Sala 3",
      status: "Agendada",
    },
    {
      id: 3,
      paciente: "Luciana Pereira",
      data: "28/11/2025",
      horario: "15:00",
      tipo: "Terapia Individual",
      sala: "Sala 2",
      status: "Concluída",
    },
    {
      id: 4,
      paciente: "Mariana Oliveira",
      data: "28/11/2025",
      horario: "14:00",
      tipo: "Terapia Individual",
      sala: "Sala 1",
      status: "Concluída",
    },
    {
      id: 5,
      paciente: "Pedro Almeida",
      data: "29/11/2025",
      horario: "10:00",
      tipo: "Avaliação Psicológica",
      sala: "Sala 3",
      status: "Cancelada",
    },
  ]);

  const filtered = useMemo(() => {
    return sessoes.filter((s) => {
      const matchQuery = (s.paciente + s.data + s.tipo + s.sala)
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchStatus = filtroStatus === "Todas" || s.status === filtroStatus;

      return matchQuery && matchStatus;
    });
  }, [sessoes, query, filtroStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agendada":
        return "bg-blue-100 text-blue-700";
      case "Concluída":
        return "bg-green-100 text-green-700";
      case "Cancelada":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-full pb-20 relative">
      {/* Botão Voltar */}
      <div
        className="hidden lg:block absolute left-6 bottom-6 px-4 py-2 rounded-full bg-[#6A22FF] text-white border border-[#6A22FF] hover:bg-[#3A0CA3] font-medium shadow-thin transition"
        style={{ zIndex: 20 }}
      >
        <BackButton
          label="Voltar"
          to="/estagiario/dashboard"
          className="flex items-center gap-2 text-white hover:text-white/80"
        />
      </div>

      {/* Cabeçalho */}
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
            Minhas Sessões
          </h1>
          <p className="text-sm text-[#6B7280]">
            Visualize e gerencie suas sessões agendadas
          </p>
        </div>
        <button
          onClick={() => navigate("/estagiario/registrar-sessao")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#6A22FF] text-white rounded-lg hover:bg-[#3A0CA3] transition-colors font-medium text-sm"
        >
          <FaPlus className="w-4 h-4" />
          Registrar Sessão
        </button>
      </header>

      {/* Filtros */}
      <div className="mb-4 space-y-3">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar por paciente, data, tipo..."
        />

        <div className="flex flex-wrap gap-2">
          {["Todas", "Agendada", "Concluída", "Cancelada"].map((status) => (
            <button
              key={status}
              onClick={() => setFiltroStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtroStatus === status
                  ? "bg-[#6A22FF] text-white"
                  : "bg-white text-[#6B7280] border border-[#E6E7EA] hover:bg-[#F9FAFB]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Sessões */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div
            className="bg-white rounded-xl p-6 border border-[#E6E7EA] text-center"
            style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
          >
            <p className="text-sm text-[#6B7280]">
              Nenhuma sessão encontrada com os filtros aplicados.
            </p>
          </div>
        ) : (
          filtered.map((sessao) => (
            <div
              key={sessao.id}
              className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA] hover:shadow-md transition-shadow"
              style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Informações principais */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <FaUser className="w-4 h-4 text-[#6A22FF]" />
                    <h3 className="text-base font-semibold text-[#3A0CA3]">
                      {sessao.paciente}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="w-3.5 h-3.5 text-[#6B7280]" />
                      <span>{sessao.data}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="w-3.5 h-3.5 text-[#6B7280]" />
                      <span>{sessao.horario}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-[#F9FAFB] text-[#6B7280] rounded-full border border-[#E6E7EA]">
                      {sessao.tipo}
                    </span>
                    <span className="px-2.5 py-1 bg-[#F9FAFB] text-[#6B7280] rounded-full border border-[#E6E7EA]">
                      {sessao.sala}
                    </span>
                  </div>
                </div>

                {/* Status e Ações */}
                <div className="flex flex-col items-start lg:items-end gap-3">
                  <span
                    className={`px-3 py-1.5 rounded-lg font-medium text-xs ${getStatusColor(
                      sessao.status
                    )}`}
                  >
                    {sessao.status}
                  </span>

                  {sessao.status === "Agendada" && (
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-[#6A22FF] text-white rounded-lg hover:bg-[#3A0CA3] transition-colors text-xs font-medium">
                        Registrar Atendimento
                      </button>
                      <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium">
                        Cancelar
                      </button>
                    </div>
                  )}

                  {sessao.status === "Concluída" && (
                    <button className="px-3 py-1.5 bg-white border border-[#E6E7EA] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-xs font-medium">
                      Ver Detalhes
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MinhasSessoes;
