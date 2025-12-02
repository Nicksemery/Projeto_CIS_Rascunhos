import { useState, useMemo } from "react";
import SearchBar from "../../components/ui/SearchBar";
import BackButton from "../../components/ui/BackButton";
import { FaCalendar, FaClock, FaUser } from "react-icons/fa";

type SessaoPendente = {
  id: number;
  estagiario: string;
  paciente: string;
  data: string;
  horario: string;
  tipo: string;
  status: "Agendada" | "Cancelada" | "Concluída";
  sala?: string;
  observacoes?: string;
};

const SessoesPendentes = () => {
  const [query, setQuery] = useState("");
  const [ordenacao, setOrdenacao] = useState<
    "data" | "estagiario" | "paciente"
  >("data");
  const [statusFiltro, setStatusFiltro] = useState<
    "todos" | "Agendada" | "Cancelada" | "Concluída"
  >("todos");

  // Mock de dados — sessões já autorizadas mas ainda não realizadas
  const [sessoes] = useState<SessaoPendente[]>([
    {
      id: 1,
      estagiario: "Ana Silva",
      paciente: "Mariana Oliveira",
      data: "05/12/2025",
      horario: "14:00",
      tipo: "Primeira consulta",
      status: "Agendada",
      sala: "Sala 3",
      observacoes: "Paciente solicitou atendimento online",
    },
    {
      id: 2,
      estagiario: "Bruno Costa",
      paciente: "Pedro Almeida",
      data: "06/12/2025",
      horario: "10:00",
      tipo: "Retorno",
      status: "Agendada",
      sala: "Sala 1",
    },
    {
      id: 3,
      estagiario: "Carla Souza",
      paciente: "Luciana Pereira",
      data: "03/12/2025",
      horario: "16:30",
      tipo: "Retorno",
      status: "Cancelada",
      sala: "Sala 2",
    },
    {
      id: 4,
      estagiario: "Ana Silva",
      paciente: "Roberto Santos",
      data: "02/12/2025",
      horario: "09:00",
      tipo: "Primeira consulta",
      status: "Concluída",
      sala: "Sala 3",
    },
    {
      id: 5,
      estagiario: "Bruno Costa",
      paciente: "Juliana Costa",
      data: "07/12/2025",
      horario: "15:00",
      tipo: "Retorno",
      status: "Agendada",
      sala: "Sala 1",
    },
  ]);

  const filtered = useMemo(() => {
    // Filtro por pesquisa
    let resultado = sessoes.filter((s) =>
      (s.estagiario + s.paciente + s.tipo + s.sala)
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    );

    // Filtro por status
    if (statusFiltro !== "todos") {
      resultado = resultado.filter((s) => s.status === statusFiltro);
    }

    // Ordenação
    if (ordenacao === "data") {
      resultado.sort((a, b) => {
        const [diaA, mesA, anoA] = a.data.split("/").map(Number);
        const [diaB, mesB, anoB] = b.data.split("/").map(Number);
        const dataA = new Date(anoA, mesA - 1, diaA);
        const dataB = new Date(anoB, mesB - 1, diaB);
        return dataA.getTime() - dataB.getTime();
      });
    } else if (ordenacao === "estagiario") {
      resultado.sort((a, b) => a.estagiario.localeCompare(b.estagiario));
    } else if (ordenacao === "paciente") {
      resultado.sort((a, b) => a.paciente.localeCompare(b.paciente));
    }

    return resultado;
  }, [sessoes, query, ordenacao, statusFiltro]);

  const getStatusBadge = (status: string) => {
    const badges = {
      Agendada: "bg-blue-100 text-blue-700",
      Cancelada: "bg-red-100 text-red-700",
      Concluída: "bg-green-100 text-green-700",
    };
    return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-full pb-20 relative">
      {/* Botão de voltar fixo no canto inferior esquerdo da área principal */}
      <div
        className="absolute left-6 bottom-6 px-4 py-2 rounded-full bg-[#6A22FF] text-white border border-[#6A22FF] hover:bg-[#3A0CA3] font-medium shadow-thin transition"
        style={{ zIndex: 20 }}
      >
        <BackButton
          label="Voltar"
          to="/coordenacao/dashboard"
          className="flex items-center gap-2 text-white hover:text-white/80"
        />
      </div>

      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
            Sessões Pendentes
          </h1>
          <p className="text-sm text-[#6B7280]">
            Sessões autorizadas aguardando realização
          </p>
        </div>

        <div className="w-full sm:w-full max-w-sm">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Pesquisar por estagiário, paciente ou sala"
          />
        </div>
      </header>

      {/* Filtros e Ordenação */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs text-[#6B7280] mb-1 font-medium">
            Ordenar por:
          </label>
          <select
            value={ordenacao}
            onChange={(e) =>
              setOrdenacao(e.target.value as "data" | "estagiario" | "paciente")
            }
            className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF] bg-white"
          >
            <option value="data">Data</option>
            <option value="estagiario">Estagiário</option>
            <option value="paciente">Paciente</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs text-[#6B7280] mb-1 font-medium">
            Filtrar por status:
          </label>
          <select
            value={statusFiltro}
            onChange={(e) =>
              setStatusFiltro(
                e.target.value as
                  | "todos"
                  | "Agendada"
                  | "Cancelada"
                  | "Concluída"
              )
            }
            className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF] bg-white"
          >
            <option value="todos">Todos</option>
            <option value="Agendada">Agendada</option>
            <option value="Cancelada">Cancelada</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>
      </div>

      {/* Lista de Sessões */}
      <div
        className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
        style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
      >
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-sm text-[#6B7280]">
            Nenhuma sessão encontrada
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.map((sessao) => (
              <div
                key={sessao.id}
                className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
                style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
              >
                <div className="flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FaUser className="text-[#6A22FF] text-sm" />
                        <h3 className="text-sm sm:text-base font-semibold text-[#3A0CA3]">
                          {sessao.estagiario}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6B7280]">
                        Paciente: {sessao.paciente}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        sessao.status
                      )}`}
                    >
                      {sessao.status}
                    </span>
                  </div>

                  {/* Informações */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-[#6B7280]" />
                      <div>
                        <span className="text-[#6B7280] font-medium">
                          Data:
                        </span>{" "}
                        <span className="text-[#3A0CA3]">{sessao.data}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#6B7280]" />
                      <div>
                        <span className="text-[#6B7280] font-medium">
                          Horário:
                        </span>{" "}
                        <span className="text-[#3A0CA3]">{sessao.horario}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[#6B7280] font-medium">Tipo:</span>{" "}
                      <span className="text-[#3A0CA3]">{sessao.tipo}</span>
                    </div>
                  </div>

                  {/* Detalhes adicionais */}
                  {(sessao.sala || sessao.observacoes) && (
                    <div className="border-t border-[#E6E7EA] pt-3 mt-1">
                      {sessao.sala && (
                        <p className="text-xs sm:text-sm text-[#6B7280] mb-1">
                          <span className="font-medium">Sala:</span>{" "}
                          {sessao.sala}
                        </p>
                      )}
                      {sessao.observacoes && (
                        <p className="text-xs sm:text-sm text-[#6B7280]">
                          <span className="font-medium">Observações:</span>{" "}
                          {sessao.observacoes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessoesPendentes;
