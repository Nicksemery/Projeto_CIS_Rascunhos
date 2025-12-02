import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import BackButton from "../../components/ui/BackButton";

const RegistrarSessao = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente: "",
    data: "",
    horario: "",
    tipo: "Terapia Individual",
    sala: "",
    presenca: "Presente",
  });

  // Mock de dados
  const pacientes = [
    { id: 1, nome: "Mariana Oliveira" },
    { id: 2, nome: "Pedro Almeida" },
    { id: 3, nome: "Luciana Pereira" },
  ];

  const salas = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala 5", "Online"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para registrar sessão
    console.log("Registrar sessão:", formData);
    navigate("/estagiario/minhas-sessoes");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          Registrar Sessão
        </h1>
        <p className="text-sm text-[#6B7280]">
          Preencha as informações da sessão realizada
        </p>
      </header>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card de Informações Básicas */}
        <div
          className="bg-white rounded-xl p-4 lg:p-5 border border-[#E6E7EA]"
          style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
        >
          <h2 className="text-base font-semibold text-[#3A0CA3] mb-4 flex items-center gap-2">
            <FaCalendar className="w-4 h-4 text-[#6A22FF]" />
            Informações da Sessão
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Paciente */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-[#6B7280] mb-2">
                Paciente <span className="text-red-500">*</span>
              </label>
              <select
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#E6E7EA] rounded-lg text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              >
                <option value="">Selecione o paciente</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.nome}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Data */}
            <div>
              <label className="block text-sm font-medium text-[#6B7280] mb-2">
                Data da Sessão <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#E6E7EA] rounded-lg text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              />
            </div>

            {/* Horário */}
            <div>
              <label className="block text-sm font-medium text-[#6B7280] mb-2">
                Horário <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="horario"
                value={formData.horario}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#E6E7EA] rounded-lg text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              />
            </div>

            {/* Tipo de Sessão */}
            <div>
              <label className="block text-sm font-medium text-[#6B7280] mb-2">
                Tipo de Sessão <span className="text-red-500">*</span>
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#E6E7EA] rounded-lg text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              >
                <option value="Terapia Individual">Terapia Individual</option>
                <option value="Avaliação Psicológica">
                  Avaliação Psicológica
                </option>
                <option value="Acompanhamento">Acompanhamento</option>
                <option value="Orientação">Orientação</option>
              </select>
            </div>

            {/* Sala */}
            <div>
              <label className="block text-sm font-medium text-[#6B7280] mb-2">
                Sala <span className="text-red-500">*</span>
              </label>
              <select
                name="sala"
                value={formData.sala}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#E6E7EA] rounded-lg text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              >
                <option value="">Selecione a sala</option>
                {salas.map((sala) => (
                  <option key={sala} value={sala}>
                    {sala}
                  </option>
                ))}
              </select>
            </div>

            {/* Presença */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-[#6B7280] mb-2">
                Presença do Paciente <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="presenca"
                    value="Presente"
                    checked={formData.presenca === "Presente"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#6A22FF] focus:ring-[#6A22FF]"
                  />
                  <span className="text-sm text-[#6B7280]">Presente</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="presenca"
                    value="Faltou"
                    checked={formData.presenca === "Faltou"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#6A22FF] focus:ring-[#6A22FF]"
                  />
                  <span className="text-sm text-[#6B7280]">Faltou</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="presenca"
                    value="Faltou com Justificativa"
                    checked={formData.presenca === "Faltou com Justificativa"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#6A22FF] focus:ring-[#6A22FF]"
                  />
                  <span className="text-sm text-[#6B7280]">
                    Faltou com Justificativa
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate("/estagiario/dashboard")}
            className="px-4 py-2 border border-[#E6E7EA] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#6A22FF] text-white rounded-lg hover:bg-[#3A0CA3] transition-colors text-sm font-medium"
          >
            Registrar Sessão
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarSessao;
