import { useState, useMemo } from "react";
import SearchBar from "../../components/ui/SearchBar";
import { FaDownload, FaEye, FaPlus } from "react-icons/fa";

// Tipos baseados nas views do banco de dados
type TipoRelatorio =
  | "sessoes_aprovadas"
  | "quantidade_estagiarios"
  | "quantidade_pacientes"
  | "sessoes_pendentes"
  | "sessoes_canceladas";

type Relatorio = {
  id: number;
  titulo: string;
  tipo: TipoRelatorio;
  descricao: string;
  dataInicio?: string;
  dataFim?: string;
  dataGeracao: string;
  status: "disponivel" | "processando";
};

const Relatorios = () => {
  const [query, setQuery] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState<"todos" | TipoRelatorio>(
    "todos"
  );
  const [ordenacao, setOrdenacao] = useState<"data" | "relevancia">("data");
  const [showGerarModal, setShowGerarModal] = useState(false);
  const [novoRelatorio, setNovoRelatorio] = useState({
    tipo: "sessoes_aprovadas" as TipoRelatorio,
    dataInicio: "",
    dataFim: "",
  });

  const getTipoLabel = (tipo: TipoRelatorio): string => {
    const labels: Record<TipoRelatorio, string> = {
      sessoes_aprovadas: "Sessões Aprovadas",
      quantidade_estagiarios: "Quantidade de Estagiários",
      quantidade_pacientes: "Quantidade de Pacientes",
      sessoes_pendentes: "Sessões Pendentes",
      sessoes_canceladas: "Sessões Canceladas",
    };
    return labels[tipo];
  };

  const filtered = useMemo(() => {
    // Mock data - substituir por chamada à API
    const relatorios: Relatorio[] = [
      {
        id: 1,
        titulo: "Relatório de Sessões Aprovadas",
        tipo: "sessoes_aprovadas",
        descricao:
          "Lista completa de todas as sessões aprovadas com dados do coordenador, estagiário e paciente",
        dataInicio: "01/11/2025",
        dataFim: "30/11/2025",
        dataGeracao: "01/12/2025",
        status: "disponivel",
      },
      {
        id: 2,
        titulo: "Quantidade de Estagiários",
        tipo: "quantidade_estagiarios",
        descricao: "Total de psicólogos estagiários cadastrados no sistema",
        dataInicio: "01/11/2025",
        dataFim: "30/11/2025",
        dataGeracao: "01/12/2025",
        status: "disponivel",
      },
      {
        id: 3,
        titulo: "Quantidade de Pacientes",
        tipo: "quantidade_pacientes",
        descricao: "Total de pacientes cadastrados no sistema",
        dataInicio: "01/11/2025",
        dataFim: "30/11/2025",
        dataGeracao: "01/12/2025",
        status: "disponivel",
      },
      {
        id: 4,
        titulo: "Sessões Pendentes de Aprovação",
        tipo: "sessoes_pendentes",
        descricao: "Total de sessões aguardando aprovação da coordenação",
        dataInicio: "01/11/2025",
        dataFim: "30/11/2025",
        dataGeracao: "01/12/2025",
        status: "disponivel",
      },
      {
        id: 5,
        titulo: "Sessões Canceladas",
        tipo: "sessoes_canceladas",
        descricao: "Total de sessões que foram canceladas",
        dataInicio: "01/10/2025",
        dataFim: "31/10/2025",
        dataGeracao: "30/11/2025",
        status: "disponivel",
      },
    ];

    const resultado = relatorios.filter((r) => {
      const matchesQuery =
        r.titulo.toLowerCase().includes(query.toLowerCase()) ||
        r.descricao.toLowerCase().includes(query.toLowerCase());
      const matchesTipo = tipoFiltro === "todos" || r.tipo === tipoFiltro;
      return matchesQuery && matchesTipo;
    });

    // Ordenação
    if (ordenacao === "data") {
      resultado.sort((a, b) => {
        const [diaA, mesA, anoA] = a.dataGeracao.split("/").map(Number);
        const [diaB, mesB, anoB] = b.dataGeracao.split("/").map(Number);
        const dataA = new Date(anoA, mesA - 1, diaA);
        const dataB = new Date(anoB, mesB - 1, diaB);
        return dataB.getTime() - dataA.getTime(); // Mais recente primeiro
      });
    } else if (ordenacao === "relevancia") {
      // Ordena por status (processando primeiro) e depois por tipo
      resultado.sort((a, b) => {
        if (a.status === "processando" && b.status !== "processando") return -1;
        if (a.status !== "processando" && b.status === "processando") return 1;
        return a.titulo.localeCompare(b.titulo);
      });
    }

    return resultado;
  }, [query, tipoFiltro, ordenacao]);

  const handleDownload = (id: number) => {
    console.log("Download relatório:", id);
    // TODO: Implementar download do relatório
  };

  const handleVisualizar = (id: number) => {
    console.log("Visualizar relatório:", id);
    // TODO: Implementar visualização do relatório
  };

  const handleGerarRelatorio = () => {
    console.log("Gerar relatório:", novoRelatorio);
    // TODO: Implementar geração do relatório com as datas
    setShowGerarModal(false);
    setNovoRelatorio({
      tipo: "sessoes_aprovadas",
      dataInicio: "",
      dataFim: "",
    });
  };

  return (
    <div className="min-h-full pb-6">
      {/* Header */}
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
            Relatórios
          </h1>
          <p className="text-sm text-[#6B7280]">
            Visualize e faça download dos relatórios do sistema
          </p>
        </div>

        <button
          onClick={() => setShowGerarModal(true)}
          className="px-4 py-2 rounded-full bg-[#6A22FF] text-white text-sm font-medium hover:bg-[#5A1CE5] transition flex items-center justify-center gap-2"
        >
          <FaPlus />
          Gerar Novo Relatório
        </button>
      </header>

      {/* Filtros */}
      <div className="mb-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar relatórios..."
        />
      </div>

      {/* Ordenação e Filtro */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs text-[#6B7280] mb-1 font-medium">
            Ordenar por:
          </label>
          <select
            value={ordenacao}
            onChange={(e) =>
              setOrdenacao(e.target.value as "data" | "relevancia")
            }
            className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF] bg-white"
          >
            <option value="data">Data de Geração</option>
            <option value="relevancia">Relevância</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs text-[#6B7280] mb-1 font-medium">
            Filtrar por tipo:
          </label>
          <select
            value={tipoFiltro}
            onChange={(e) =>
              setTipoFiltro(e.target.value as "todos" | TipoRelatorio)
            }
            className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF] bg-white"
          >
            <option value="todos">Todos</option>
            <option value="sessoes_aprovadas">Sessões Aprovadas</option>
            <option value="quantidade_estagiarios">
              Quantidade de Estagiários
            </option>
            <option value="quantidade_pacientes">
              Quantidade de Pacientes
            </option>
            <option value="sessoes_pendentes">Sessões Pendentes</option>
            <option value="sessoes_canceladas">Sessões Canceladas</option>
          </select>
        </div>
      </div>

      {/* Lista de Relatórios */}
      <div
        className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
        style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
      >
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-sm text-[#6B7280]">
            Nenhum relatório encontrado
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.map((relatorio) => (
              <div
                key={relatorio.id}
                className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
                style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-[#3A0CA3] mb-1">
                          {relatorio.titulo}
                        </h3>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-[#6A22FF] font-medium">
                            {getTipoLabel(relatorio.tipo)}
                          </span>
                          {relatorio.status === "processando" && (
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                              Processando
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm mt-3 space-y-1">
                      <div className="text-[#6B7280]">
                        {relatorio.descricao}
                      </div>
                      {relatorio.dataInicio && relatorio.dataFim && (
                        <div className="text-[#6B7280] font-medium">
                          Período: {relatorio.dataInicio} até{" "}
                          {relatorio.dataFim}
                        </div>
                      )}
                      <div className="text-[#6B7280] text-xs">
                        Gerado em: {relatorio.dataGeracao}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  {relatorio.status === "disponivel" && (
                    <div className="flex sm:flex-col gap-2">
                      <button
                        onClick={() => handleVisualizar(relatorio.id)}
                        className="flex-1 sm:flex-initial px-3 py-2 rounded-full border border-[#6A22FF] text-[#6A22FF] text-xs sm:text-sm hover:bg-purple-50 transition flex items-center justify-center gap-2"
                        title="Visualizar"
                      >
                        <FaEye />
                        <span className="hidden sm:inline">Visualizar</span>
                      </button>
                      <button
                        onClick={() => handleDownload(relatorio.id)}
                        className="flex-1 sm:flex-initial px-3 py-2 rounded-full bg-[#6A22FF] text-white text-xs sm:text-sm hover:bg-[#5A1CE5] transition flex items-center justify-center gap-2"
                        title="Download"
                      >
                        <FaDownload />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Gerar Relatório */}
      {showGerarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#3A0CA3] mb-4">
              Gerar Novo Relatório
            </h2>

            <div className="space-y-4">
              {/* Tipo de Relatório */}
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Tipo de Relatório
                </label>
                <select
                  value={novoRelatorio.tipo}
                  onChange={(e) =>
                    setNovoRelatorio({
                      ...novoRelatorio,
                      tipo: e.target.value as TipoRelatorio,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
                >
                  <option value="sessoes_aprovadas">Sessões Aprovadas</option>
                  <option value="quantidade_estagiarios">
                    Quantidade de Estagiários
                  </option>
                  <option value="quantidade_pacientes">
                    Quantidade de Pacientes
                  </option>
                  <option value="sessoes_pendentes">Sessões Pendentes</option>
                  <option value="sessoes_canceladas">Sessões Canceladas</option>
                </select>
              </div>

              {/* Data Início */}
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Data Início
                </label>
                <input
                  type="date"
                  value={novoRelatorio.dataInicio}
                  onChange={(e) =>
                    setNovoRelatorio({
                      ...novoRelatorio,
                      dataInicio: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
                />
              </div>

              {/* Data Fim */}
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Data Fim
                </label>
                <input
                  type="date"
                  value={novoRelatorio.dataFim}
                  onChange={(e) =>
                    setNovoRelatorio({
                      ...novoRelatorio,
                      dataFim: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowGerarModal(false)}
                className="flex-1 px-4 py-2 rounded-full border border-[#E6E7EA] text-[#6B7280] text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleGerarRelatorio}
                className="flex-1 px-4 py-2 rounded-full bg-[#6A22FF] text-white text-sm font-medium hover:bg-[#5A1CE5] transition"
              >
                Gerar Relatório
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relatorios;
