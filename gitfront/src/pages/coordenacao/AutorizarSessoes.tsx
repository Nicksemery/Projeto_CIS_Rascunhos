import { useState, useMemo } from "react";
import SearchBar from "../../components/ui/SearchBar";
import { FaCheck, FaTimes } from "react-icons/fa";

type SessaoPendente = {
  id: number;
  estagiario: string;
  paciente: string;
  data: string;
  horario: string;
  tipo: string;
  observacoes?: string;
};

const AutorizarSessoes = () => {
  const [query, setQuery] = useState("");
  const [ordenacao, setOrdenacao] = useState<
    "nome" | "data-antiga" | "data-nova"
  >("nome");
  const [tipoFiltro, setTipoFiltro] = useState<
    "todos" | "primeira" | "retorno"
  >("todos");

  // Mock de dados — substituir por fetch/Context/API real quando disponível
  const [sessoes, setSessoes] = useState<SessaoPendente[]>([
    {
      id: 1,
      estagiario: "Ana Silva",
      paciente: "Mariana Oliveira",
      data: "15/12/2025",
      horario: "14:00",
      tipo: "Primeira consulta",
      observacoes: "Paciente solicitou atendimento online",
    },
    {
      id: 2,
      estagiario: "Bruno Costa",
      paciente: "Pedro Almeida",
      data: "16/12/2025",
      horario: "10:00",
      tipo: "Retorno",
    },
    {
      id: 3,
      estagiario: "Carla Souza",
      paciente: "Luciana Pereira",
      data: "17/12/2025",
      horario: "16:30",
      tipo: "Primeira consulta",
      observacoes: "Encaminhamento médico",
    },
  ]);

  const filtered = useMemo(() => {
    // Filtro por pesquisa
    let resultado = sessoes.filter((s) =>
      (s.estagiario + s.paciente + s.tipo)
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    );

    // Filtro por tipo
    if (tipoFiltro !== "todos") {
      resultado = resultado.filter((s) =>
        tipoFiltro === "primeira"
          ? s.tipo === "Primeira consulta"
          : s.tipo === "Retorno"
      );
    }

    // Ordenação
    if (ordenacao === "nome") {
      resultado.sort((a, b) => a.estagiario.localeCompare(b.estagiario));
    } else if (ordenacao === "data-antiga") {
      resultado.sort((a, b) => {
        const [diaA, mesA, anoA] = a.data.split("/").map(Number);
        const [diaB, mesB, anoB] = b.data.split("/").map(Number);
        const dataA = new Date(anoA, mesA - 1, diaA);
        const dataB = new Date(anoB, mesB - 1, diaB);
        return dataA.getTime() - dataB.getTime();
      });
    } else if (ordenacao === "data-nova") {
      resultado.sort((a, b) => {
        const [diaA, mesA, anoA] = a.data.split("/").map(Number);
        const [diaB, mesB, anoB] = b.data.split("/").map(Number);
        const dataA = new Date(anoA, mesA - 1, diaA);
        const dataB = new Date(anoB, mesB - 1, diaB);
        return dataB.getTime() - dataA.getTime();
      });
    }

    return resultado;
  }, [sessoes, query, tipoFiltro, ordenacao]);

  const handleAprovar = (id: number) => {
    console.log("Aprovar sessão", id);
    setSessoes((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRejeitar = (id: number) => {
    console.log("Rejeitar sessão", id);
    setSessoes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-full pb-6">
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
            Autorizar Sessões
          </h1>
          <p className="text-sm text-[#6B7280]">
            Sessões pendentes aguardando aprovação
          </p>
        </div>

        <div className="w-full sm:w-full max-w-sm">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Pesquisar por estagiário, paciente ou tipo"
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
              setOrdenacao(
                e.target.value as "nome" | "data-antiga" | "data-nova"
              )
            }
            className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF] bg-white"
          >
            <option value="nome">Nome do Estagiário</option>
            <option value="data-antiga">Data mais antiga</option>
            <option value="data-nova">Data mais recente</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs text-[#6B7280] mb-1 font-medium">
            Filtrar por tipo: Filtrar por tipo:
          </label>
          <select
            value={tipoFiltro}
            onChange={(e) =>
              setTipoFiltro(e.target.value as "todos" | "primeira" | "retorno")
            }
            className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF] bg-white"
          >
            <option value="todos">Todos</option>
            <option value="primeira">Primeira consulta</option>
            <option value="retorno">Retorno</option>
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
            Nenhuma sessão pendente encontrada
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.map((sessao) => (
              <div
                key={sessao.id}
                className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
                style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <div>
                        <h3 className="font-medium text-[#3A0CA3] text-sm sm:text-base">
                          {sessao.estagiario} → {sessao.paciente}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                          {sessao.tipo}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm mt-3">
                      <div>
                        <span className="text-[#6B7280] font-medium">
                          Data:
                        </span>{" "}
                        <span className="text-[#3A0CA3]">{sessao.data}</span>
                      </div>
                      <div>
                        <span className="text-[#6B7280] font-medium">
                          Horário:
                        </span>{" "}
                        <span className="text-[#3A0CA3]">{sessao.horario}</span>
                      </div>
                    </div>

                    {sessao.observacoes && (
                      <div className="mt-3 text-xs sm:text-sm">
                        <span className="text-[#6B7280] font-medium">
                          Observações:
                        </span>{" "}
                        <span className="text-[#6B7280]">
                          {sessao.observacoes}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col gap-2">
                    <button
                      onClick={() => handleAprovar(sessao.id)}
                      className="flex-1 sm:flex-initial px-3 py-2 rounded-full bg-green-600 text-white text-xs sm:text-sm hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                      <FaCheck />
                      <span>Aprovar</span>
                    </button>
                    <button
                      onClick={() => handleRejeitar(sessao.id)}
                      className="flex-1 sm:flex-initial px-3 py-2 rounded-full border border-red-600 text-red-600 text-xs sm:text-sm hover:bg-red-50 transition flex items-center justify-center gap-2"
                    >
                      <FaTimes />
                      <span>Rejeitar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutorizarSessoes;
