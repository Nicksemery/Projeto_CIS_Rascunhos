import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";

const CadastrarEstagiario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    matricula: "",
    telefone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cadastrar estagiário:", formData);
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
          Cadastrar Novo Estagiário
        </h1>
        <p className="text-sm text-[#6B7280]">
          Preencha as informações para criar uma nova conta de estagiário
        </p>
      </header>

      <div
        className="bg-white rounded-xl p-4 lg:p-6 border border-[#E6E7EA]"
        style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grid de 2 colunas para desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Nome */}
            <div className="lg:col-span-2">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Nome Completo *
              </label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder="Digite o nome completo"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="exemplo@email.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              />
            </div>

            {/* Matrícula */}
            <div>
              <label
                htmlFor="matricula"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Matrícula *
              </label>
              <input
                type="text"
                id="matricula"
                value={formData.matricula}
                onChange={(e) =>
                  setFormData({ ...formData, matricula: e.target.value })
                }
                placeholder="Digite a matrícula"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              />
            </div>

            {/* Telefone */}
            <div className="lg:col-span-2">
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-[#6B7280] mb-2"
              >
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
              />
            </div>
          </div>

          {/* Nota informativa */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-5">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">Informação:</span> A senha de
              primeiro acesso será a própria matrícula do aluno. O estagiário
              poderá alterá-la após o primeiro login.
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
              Cadastrar Estagiário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarEstagiario;
