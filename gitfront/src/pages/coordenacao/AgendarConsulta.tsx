import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";

const AgendarConsulta = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente: "",
    estagiario: "",
    data: "",
    horario: "",
    tipo: "primeira" as "primeira" | "retorno",
    sala: "",
    observacoes: "",
  });

  // Mock de dados - substituir por dados do backend
  const pacientes = [
    { id: 1, nome: "Mariana Oliveira" },
    { id: 2, nome: "Pedro Almeida" },
    { id: 3, nome: "Luciana Pereira" },
  ];

  const estagiarios = [
    { id: 1, nome: "Ana Silva" },
    { id: 2, nome: "Bruno Costa" },
    { id: 3, nome: "Carlos Mendes" },
  ];

  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const salas = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Online"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Agendar consulta:", formData);
    // TODO: integrar com backend
    navigate("/coordenacao/dashboard");
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

      <header className="mb-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
          Agendar Consulta
        </h1>
        <p className="text-sm text-[#6B7280]">
          Preencha as informações para agendar uma nova sessão
        </p>
      </header>

      <div
        className="bg-white rounded-xl p-4 lg:p-6 border border-[#E6E7EA]"
        style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grid de 2 colunas para desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Paciente */}
            <div>
              <label
                htmlFor="paciente"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Paciente *
              </label>
              <select
                id="paciente"
                value={formData.paciente}
                onChange={(e) =>
                  setFormData({ ...formData, paciente: e.target.value })
                }
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              >
                <option value="">Selecione um paciente</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Estagiário */}
            <div>
              <label
                htmlFor="estagiario"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Estagiário *
              </label>
              <select
                id="estagiario"
                value={formData.estagiario}
                onChange={(e) =>
                  setFormData({ ...formData, estagiario: e.target.value })
                }
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              >
                <option value="">Selecione um estagiário</option>
                {estagiarios.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Data */}
            <div>
              <label
                htmlFor="data"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Data *
              </label>
              <input
                type="date"
                id="data"
                value={formData.data}
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              />
            </div>

            {/* Horário */}
            <div>
              <label
                htmlFor="horario"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Horário *
              </label>
              <select
                id="horario"
                value={formData.horario}
                onChange={(e) =>
                  setFormData({ ...formData, horario: e.target.value })
                }
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              >
                <option value="">Selecione um horário</option>
                {horarios.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Consulta */}
            <div>
              <label
                htmlFor="tipo"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Tipo de Consulta *
              </label>
              <select
                id="tipo"
                value={formData.tipo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipo: e.target.value as "primeira" | "retorno",
                  })
                }
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              >
                <option value="primeira">Primeira Consulta</option>
                <option value="retorno">Retorno</option>
              </select>
            </div>

            {/* Sala */}
            <div>
              <label
                htmlFor="sala"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Sala
              </label>
              <select
                id="sala"
                value={formData.sala}
                onChange={(e) =>
                  setFormData({ ...formData, sala: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              >
                <option value="">Selecione uma sala</option>
                {salas.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Observações */}
            <div className="lg:col-span-2">
              <label
                htmlFor="observacoes"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Observações
              </label>
              <textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) =>
                  setFormData({ ...formData, observacoes: e.target.value })
                }
                placeholder="Informações adicionais sobre o agendamento"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF] resize-none"
              />
            </div>
          </div>

          {/* Nota informativa */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-5">
            <p className="text-xs text-yellow-800">
              <span className="font-semibold">Atenção:</span> O agendamento
              ficará pendente de aprovação da coordenação antes de ser
              confirmado.
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2 border-t border-[#E6E7EA] mt-6">
            <button
              type="button"
              onClick={() => navigate("/coordenacao/dashboard")}
              className="flex-1 px-4 py-2.5 rounded-full border border-[#E6E7EA] text-[#6B7280] text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-full bg-[#6A22FF] text-white text-sm font-medium hover:bg-[#5A1CE5] transition"
            >
              Agendar Consulta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgendarConsulta;
