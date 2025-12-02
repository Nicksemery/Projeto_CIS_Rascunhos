import { useState, useMemo } from "react";
import { FaClock, FaCalendarAlt, FaUser, FaCheck } from "react-icons/fa";
import BackButton from "../../components/ui/BackButton";

type DiaSemana = "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta" | "Sábado";

type Horario = {
  dia: DiaSemana;
  periodo: string; // "Manhã" | "Tarde" | "Noite"
};

type Paciente = {
  id: number;
  nome: string;
  idade: number;
  demanda: string;
  horarios: Horario[];
};

const EncontrarPacientes = () => {
  const [selectedDias, setSelectedDias] = useState<DiaSemana[]>([]);
  const [selectedPeriodos, setSelectedPeriodos] = useState<string[]>([]);

  // Mock data - pacientes sem estagiário
  const pacientes: Paciente[] = [
    {
      id: 1,
      nome: "Carlos Silva",
      idade: 28,
      demanda: "Ansiedade generalizada",
      horarios: [
        { dia: "Segunda", periodo: "Manhã" },
        { dia: "Quarta", periodo: "Manhã" },
        { dia: "Sexta", periodo: "Tarde" },
      ],
    },
    {
      id: 2,
      nome: "Maria Santos",
      idade: 34,
      demanda: "Depressão",
      horarios: [
        { dia: "Terça", periodo: "Tarde" },
        { dia: "Quinta", periodo: "Tarde" },
        { dia: "Sexta", periodo: "Manhã" },
      ],
    },
    {
      id: 3,
      nome: "João Oliveira",
      idade: 45,
      demanda: "Transtorno de pânico",
      horarios: [
        { dia: "Segunda", periodo: "Tarde" },
        { dia: "Quarta", periodo: "Tarde" },
        { dia: "Quinta", periodo: "Manhã" },
      ],
    },
    {
      id: 4,
      nome: "Ana Costa",
      idade: 22,
      demanda: "Fobia social",
      horarios: [
        { dia: "Terça", periodo: "Manhã" },
        { dia: "Quinta", periodo: "Manhã" },
        { dia: "Sexta", periodo: "Tarde" },
      ],
    },
    {
      id: 5,
      nome: "Pedro Lima",
      idade: 38,
      demanda: "TOC",
      horarios: [
        { dia: "Segunda", periodo: "Manhã" },
        { dia: "Quarta", periodo: "Tarde" },
        { dia: "Sexta", periodo: "Manhã" },
      ],
    },
    {
      id: 6,
      nome: "Beatriz Alves",
      idade: 30,
      demanda: "Estresse pós-traumático",
      horarios: [
        { dia: "Terça", periodo: "Tarde" },
        { dia: "Quinta", periodo: "Tarde" },
        { dia: "Sábado", periodo: "Manhã" },
      ],
    },
  ];

  const diasSemana: DiaSemana[] = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const periodos = ["Manhã", "Tarde", "Noite"];

  const toggleDia = (dia: DiaSemana) => {
    setSelectedDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const togglePeriodo = (periodo: string) => {
    setSelectedPeriodos((prev) =>
      prev.includes(periodo)
        ? prev.filter((p) => p !== periodo)
        : [...prev, periodo]
    );
  };

  const limparFiltros = () => {
    setSelectedDias([]);
    setSelectedPeriodos([]);
  };

  // Filtrar pacientes por compatibilidade de horários
  const pacientesFiltrados = useMemo(() => {
    let resultado = pacientes;

    // Se nenhum filtro de horário foi selecionado, mostrar todos
    if (selectedDias.length === 0 && selectedPeriodos.length === 0) {
      return resultado;
    }

    // Filtrar por compatibilidade de horários
    return resultado.filter((paciente) => {
      return paciente.horarios.some((horario) => {
        const diaMatch =
          selectedDias.length === 0 || selectedDias.includes(horario.dia);
        const periodoMatch =
          selectedPeriodos.length === 0 ||
          selectedPeriodos.includes(horario.periodo);
        return diaMatch && periodoMatch;
      });
    });
  }, [pacientes, selectedDias, selectedPeriodos]);

  // Contar horários compatíveis para cada paciente
  const contarHorariosCompativeis = (horarios: Horario[]) => {
    if (selectedDias.length === 0 && selectedPeriodos.length === 0) {
      return horarios.length;
    }

    return horarios.filter((horario) => {
      const diaMatch =
        selectedDias.length === 0 || selectedDias.includes(horario.dia);
      const periodoMatch =
        selectedPeriodos.length === 0 ||
        selectedPeriodos.includes(horario.periodo);
      return diaMatch && periodoMatch;
    }).length;
  };

  return (
    <div className="min-h-full pb-20 relative">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2" style={{ color: "#3A0CA3" }}>
          Encontrar Pacientes
        </h1>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Encontre pacientes com horários compatíveis com sua disponibilidade
        </p>
      </div>

      {/* Filtros de Disponibilidade */}
      <div
        className="bg-white rounded-lg p-6 mb-6"
        style={{
          boxShadow: "0 6px 18px rgba(18,18,18,0.06)",
          border: "1px solid #E6E7EA",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#3A0CA3" }}>
            Sua Disponibilidade
          </h2>
          {(selectedDias.length > 0 || selectedPeriodos.length > 0) && (
            <button
              onClick={limparFiltros}
              className="text-sm font-medium hover:underline"
              style={{ color: "#6A22FF" }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Dias da Semana */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#6B7280" }}
          >
            Dias disponíveis
          </label>
          <div className="flex flex-wrap gap-2">
            {diasSemana.map((dia) => (
              <button
                key={dia}
                onClick={() => toggleDia(dia)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedDias.includes(dia)
                    ? "text-white"
                    : "bg-white hover:bg-[#F9FAFB]"
                }`}
                style={
                  selectedDias.includes(dia)
                    ? {
                        backgroundColor: "#6A22FF",
                        border: "1px solid #6A22FF",
                      }
                    : { color: "#6B7280", border: "1px solid #E6E7EA" }
                }
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        {/* Períodos */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#6B7280" }}
          >
            Períodos disponíveis
          </label>
          <div className="flex flex-wrap gap-2">
            {periodos.map((periodo) => (
              <button
                key={periodo}
                onClick={() => togglePeriodo(periodo)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedPeriodos.includes(periodo)
                    ? "text-white"
                    : "bg-white hover:bg-[#F9FAFB]"
                }`}
                style={
                  selectedPeriodos.includes(periodo)
                    ? {
                        backgroundColor: "#6A22FF",
                        border: "1px solid #6A22FF",
                      }
                    : { color: "#6B7280", border: "1px solid #E6E7EA" }
                }
              >
                {periodo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-4">
        <p className="text-sm font-medium" style={{ color: "#6B7280" }}>
          {pacientesFiltrados.length} paciente
          {pacientesFiltrados.length !== 1 ? "s" : ""}{" "}
          {selectedDias.length > 0 || selectedPeriodos.length > 0
            ? "com horários compatíveis"
            : "disponíveis"}
        </p>
      </div>

      {/* Cards de Pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pacientesFiltrados.map((paciente) => {
          const horariosCompativeis = contarHorariosCompativeis(
            paciente.horarios
          );

          return (
            <div
              key={paciente.id}
              className="bg-white rounded-lg p-5 hover:bg-[#F9FAFB] transition"
              style={{
                boxShadow: "0 6px 18px rgba(18,18,18,0.06)",
                border: "1px solid #E6E7EA",
              }}
            >
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#6A22FF" }}
                  >
                    <FaUser className="text-white text-sm" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: "#3A0CA3" }}
                    >
                      {paciente.nome}
                    </h3>
                    <p className="text-xs" style={{ color: "#6B7280" }}>
                      {paciente.idade} anos
                    </p>
                  </div>
                </div>
              </div>

              {/* Demanda */}
              <div className="mb-4">
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "#6B7280" }}
                >
                  Demanda
                </p>
                <p className="text-sm" style={{ color: "#3A0CA3" }}>
                  {paciente.demanda}
                </p>
              </div>

              {/* Horários Disponíveis */}
              <div className="mb-4">
                <p
                  className="text-xs font-medium mb-2"
                  style={{ color: "#6B7280" }}
                >
                  Horários disponíveis
                  {horariosCompativeis > 0 &&
                    (selectedDias.length > 0 ||
                      selectedPeriodos.length > 0) && (
                      <span
                        className="ml-1 text-xs font-semibold"
                        style={{ color: "#6A22FF" }}
                      >
                        ({horariosCompativeis} compatíve
                        {horariosCompativeis !== 1 ? "is" : "l"})
                      </span>
                    )}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {paciente.horarios.map((horario, idx) => {
                    const isCompativel =
                      (selectedDias.length === 0 ||
                        selectedDias.includes(horario.dia)) &&
                      (selectedPeriodos.length === 0 ||
                        selectedPeriodos.includes(horario.periodo));

                    return (
                      <div
                        key={idx}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          isCompativel &&
                          (selectedDias.length > 0 ||
                            selectedPeriodos.length > 0)
                            ? "text-white"
                            : ""
                        }`}
                        style={
                          isCompativel &&
                          (selectedDias.length > 0 ||
                            selectedPeriodos.length > 0)
                            ? { backgroundColor: "#6A22FF" }
                            : { backgroundColor: "#F9FAFB", color: "#6B7280" }
                        }
                      >
                        <FaClock
                          className="inline mr-1"
                          style={{ fontSize: "10px" }}
                        />
                        {horario.dia} - {horario.periodo}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botão de Ação */}
              <button
                className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white transition"
                style={{
                  backgroundColor: "#6A22FF",
                  border: "1px solid #6A22FF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3A0CA3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#6A22FF";
                }}
              >
                <FaCheck className="inline mr-2" />
                Solicitar Acompanhamento
              </button>
            </div>
          );
        })}
      </div>

      {/* Mensagem quando não há resultados */}
      {pacientesFiltrados.length === 0 && (
        <div
          className="bg-white rounded-lg p-8 text-center"
          style={{
            boxShadow: "0 6px 18px rgba(18,18,18,0.06)",
            border: "1px solid #E6E7EA",
          }}
        >
          <FaCalendarAlt
            className="mx-auto mb-3"
            style={{ fontSize: "48px", color: "#E6E7EA" }}
          />
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "#3A0CA3" }}
          >
            Nenhum paciente encontrado
          </h3>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Tente ajustar seus filtros de disponibilidade para encontrar mais
            pacientes compatíveis.
          </p>
        </div>
      )}

      {/* Back Button */}
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
    </div>
  );
};

export default EncontrarPacientes;
