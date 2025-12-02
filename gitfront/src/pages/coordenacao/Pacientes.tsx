import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/cards/ProfileCard";
import SearchBar from "../../components/ui/SearchBar";
import { FaPlus } from "react-icons/fa";

type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  ativo: boolean;
};

const Pacientes = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [novoPaciente, setNovoPaciente] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  // Mock de dados — substituir por fetch/Context/API real quando disponível
  const [pacientes] = useState<Paciente[]>([
    {
      id: 1,
      nome: "Mariana Oliveira",
      email: "mariana.oliv@ex.com",
      telefone: "(11) 99999-0001",
      ativo: true,
    },
    {
      id: 2,
      nome: "Pedro Almeida",
      email: "pedro.almeida@ex.com",
      telefone: "(11) 98888-1111",
      ativo: true,
    },
    {
      id: 3,
      nome: "Luciana Pereira",
      email: "luciana.p@ex.com",
      telefone: "(11) 97777-2222",
      ativo: false,
    },
  ]);

  const filtered = useMemo(
    () =>
      pacientes.filter((p) =>
        (p.nome + p.email + (p.telefone ?? ""))
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      ),
    [pacientes, query]
  );

  const handleCadastrarPaciente = () => {
    console.log("Cadastrar paciente:", novoPaciente);
    // TODO: integrar com backend
    setShowCadastroModal(false);
    setNovoPaciente({
      nome: "",
      email: "",
      telefone: "",
    });
  };

  return (
    <div className="min-h-full pb-6">
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
            Gerenciar Pacientes
          </h1>
          <p className="text-sm text-[#6B7280]">
            Pacientes cadastrados no sistema.
          </p>
        </div>

        <button
          onClick={() => setShowCadastroModal(true)}
          className="px-4 py-2 rounded-full bg-[#6A22FF] text-white text-sm font-medium hover:bg-[#5A1CE5] transition flex items-center justify-center gap-2"
        >
          <FaPlus />
          Cadastrar Paciente
        </button>
      </header>

      <div className="mb-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Pesquisar por nome, e-mail ou telefone"
        />
      </div>

      <div
        className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
        style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
      >
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-sm text-[#6B7280]">
            Nenhum paciente encontrado.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
                style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
              >
                <ProfileCard
                  id={p.id}
                  title={p.nome}
                  subtitle={p.email}
                  statusLabel={p.ativo ? "Ativo" : "Inativo"}
                  statusVariant={p.ativo ? "success" : "neutral"}
                  meta={[{ label: "Telefone", value: p.telefone }]}
                  onView={(id) => navigate(`/coordenacao/pacientes/${id}`)}
                  onEdit={(id) => console.log("Editar paciente", id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Cadastrar Paciente */}
      {showCadastroModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#3A0CA3] mb-4">
              Cadastrar Novo Paciente
            </h2>

            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={novoPaciente.nome}
                  onChange={(e) =>
                    setNovoPaciente({
                      ...novoPaciente,
                      nome: e.target.value,
                    })
                  }
                  placeholder="Digite o nome completo"
                  className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={novoPaciente.email}
                  onChange={(e) =>
                    setNovoPaciente({
                      ...novoPaciente,
                      email: e.target.value,
                    })
                  }
                  placeholder="exemplo@email.com"
                  className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={novoPaciente.telefone}
                  onChange={(e) =>
                    setNovoPaciente({
                      ...novoPaciente,
                      telefone: e.target.value,
                    })
                  }
                  placeholder="(11) 99999-9999"
                  className="w-full px-3 py-2 rounded-lg border border-[#E6E7EA] text-sm text-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF]"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCadastroModal(false)}
                className="flex-1 px-4 py-2 rounded-full border border-[#E6E7EA] text-[#6B7280] text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleCadastrarPaciente}
                className="flex-1 px-4 py-2 rounded-full bg-[#6A22FF] text-white text-sm font-medium hover:bg-[#5A1CE5] transition"
              >
                Cadastrar Paciente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pacientes;
