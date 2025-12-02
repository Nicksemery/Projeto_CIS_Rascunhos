import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/cards/ProfileCard";
import SearchBar from "../../components/ui/SearchBar";
import BackButton from "../../components/ui/BackButton";

type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  proximaSessao?: string;
  totalSessoes: number;
};

const MeusPacientes = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Mock de dados
  const [pacientes] = useState<Paciente[]>([
    {
      id: 1,
      nome: "Mariana Oliveira",
      email: "mariana.oliv@ex.com",
      telefone: "(11) 99999-0001",
      proximaSessao: "05/12/2025",
      totalSessoes: 8,
    },
    {
      id: 2,
      nome: "Pedro Almeida",
      email: "pedro.almeida@ex.com",
      telefone: "(11) 98888-1111",
      proximaSessao: "06/12/2025",
      totalSessoes: 3,
    },
    {
      id: 3,
      nome: "Luciana Pereira",
      email: "luciana.p@ex.com",
      telefone: "(11) 97777-2222",
      totalSessoes: 12,
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

      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
            Meus Pacientes
          </h1>
          <p className="text-sm text-[#6B7280]">
            Pacientes sob seu acompanhamento
          </p>
        </div>

        <div className="w-full sm:w-full max-w-sm">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Pesquisar por nome, e-mail ou telefone"
          />
        </div>
      </header>

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
                  statusLabel={
                    p.proximaSessao
                      ? `Próxima: ${p.proximaSessao}`
                      : "Sem sessões agendadas"
                  }
                  statusVariant={p.proximaSessao ? "success" : "neutral"}
                  meta={[
                    { label: "Telefone", value: p.telefone },
                    {
                      label: "Total de Sessões",
                      value: p.totalSessoes.toString(),
                    },
                  ]}
                  onView={(id) => navigate(`/estagiario/meus-pacientes/${id}`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusPacientes;
