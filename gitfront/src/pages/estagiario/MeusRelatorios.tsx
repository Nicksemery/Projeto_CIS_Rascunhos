import { useState, useMemo } from "react";
import { FaFileAlt, FaCalendar, FaUser } from "react-icons/fa";
import SearchBar from "../../components/ui/SearchBar";
import BackButton from "../../components/ui/BackButton";

type Relatorio = {
  id: number;
  coordenador: string;
  periodo: string;
  dataGeracao: string;
  tipo: string;
  avaliacao: "Excelente" | "Bom" | "Regular" | "Necessita Melhoria";
};

const MeusRelatorios = () => {
  const [query, setQuery] = useState("");
  const [filtroAvaliacao, setFiltroAvaliacao] = useState<string>("Todos");

  // Mock de dados
  const [relatorios] = useState<Relatorio[]>([
    {
      id: 1,
      coordenador: "Dr. Carlos Silva",
      periodo: "Novembro 2025",
      dataGeracao: "30/11/2025",
      tipo: "Mensal",
      avaliacao: "Excelente",
    },
    {
      id: 2,
      coordenador: "Dr. Carlos Silva",
      periodo: "Outubro 2025",
      dataGeracao: "31/10/2025",
      tipo: "Mensal",
      avaliacao: "Bom",
    },
    {
      id: 3,
      coordenador: "Dra. Ana Paula",
      periodo: "Setembro 2025",
      dataGeracao: "30/09/2025",
      tipo: "Mensal",
      avaliacao: "Excelente",
    },
    {
      id: 4,
      coordenador: "Dr. Carlos Silva",
      periodo: "Q3 2025",
      dataGeracao: "01/10/2025",
      tipo: "Trimestral",
      avaliacao: "Bom",
    },
  ]);

  const filtered = useMemo(() => {
    return relatorios.filter((r) => {
      const matchQuery = (r.coordenador + r.periodo + r.tipo)
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchAvaliacao =
        filtroAvaliacao === "Todos" || r.avaliacao === filtroAvaliacao;

      return matchQuery && matchAvaliacao;
    });
  }, [relatorios, query, filtroAvaliacao]);

  const getAvaliacaoColor = (avaliacao: string) => {
    switch (avaliacao) {
      case "Excelente":
        return "bg-green-100 text-green-700";
      case "Bom":
        return "bg-blue-100 text-blue-700";
      case "Regular":
        return "bg-yellow-100 text-yellow-700";
      case "Necessita Melhoria":
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
      <header className="mb-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
          Meus Relatórios de Desempenho
        </h1>
        <p className="text-sm text-[#6B7280]">
          Visualize as avaliações feitas pela coordenação sobre seu desempenho
        </p>
      </header>

      {/* Filtros */}
      <div className="mb-4 space-y-3">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar por coordenador, período, tipo..."
        />

        <div className="flex flex-wrap gap-2">
          {["Todos", "Excelente", "Bom", "Regular", "Necessita Melhoria"].map(
            (avaliacao) => (
              <button
                key={avaliacao}
                onClick={() => setFiltroAvaliacao(avaliacao)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filtroAvaliacao === avaliacao
                    ? "bg-[#6A22FF] text-white"
                    : "bg-white text-[#6B7280] border border-[#E6E7EA] hover:bg-[#F9FAFB]"
                }`}
              >
                {avaliacao}
              </button>
            )
          )}
        </div>
      </div>

      {/* Lista de Relatórios */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div
            className="bg-white rounded-xl p-6 border border-[#E6E7EA] text-center"
            style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
          >
            <p className="text-sm text-[#6B7280]">
              Nenhum relatório encontrado com os filtros aplicados.
            </p>
          </div>
        ) : (
          filtered.map((relatorio) => (
            <div
              key={relatorio.id}
              className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA] hover:shadow-md transition-shadow"
              style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Informações principais */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <FaFileAlt className="w-4 h-4 text-[#6A22FF]" />
                    <h3 className="text-base font-semibold text-[#3A0CA3]">
                      Relatório de Desempenho - {relatorio.periodo}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <FaUser className="w-3.5 h-3.5 text-[#6B7280]" />
                      <span>Coordenador: {relatorio.coordenador}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="w-3.5 h-3.5 text-[#6B7280]" />
                      <span>Gerado em: {relatorio.dataGeracao}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-[#F9FAFB] text-[#6B7280] rounded-full border border-[#E6E7EA]">
                      {relatorio.tipo}
                    </span>
                  </div>
                </div>

                {/* Avaliação e Ações */}
                <div className="flex flex-col items-start lg:items-end gap-3">
                  <span
                    className={`px-3 py-1.5 rounded-lg font-medium text-xs ${getAvaliacaoColor(
                      relatorio.avaliacao
                    )}`}
                  >
                    {relatorio.avaliacao}
                  </span>

                  <button className="px-3 py-1.5 bg-[#6A22FF] text-white rounded-lg hover:bg-[#3A0CA3] transition-colors text-xs font-medium">
                    Ver Relatório Completo
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MeusRelatorios;
