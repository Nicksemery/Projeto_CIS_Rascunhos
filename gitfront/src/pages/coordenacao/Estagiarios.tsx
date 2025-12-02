import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/cards/ProfileCard";
import SearchBar from "../../components/ui/SearchBar";

type Estagiario = {
  id: number;
  nome: string;
  curso: string;
  email: string;
  turno?: string;
  periodo?: string;
  ativo: boolean;
};

const Estagiarios = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Mock de dados — substituir por fetch/Context/API real quando disponível
  const [estagiarios] = useState<Estagiario[]>([
    {
      id: 1,
      nome: "Ana Silva",
      curso: "Psicologia",
      email: "ana.silva@uni.edu",
      turno: "Matutino",
      periodo: "4º período",
      ativo: true,
    },
    {
      id: 2,
      nome: "Bruno Costa",
      curso: "Psicologia",
      email: "bruno.costa@uni.edu",
      turno: "Vespertino",
      periodo: "5º período",
      ativo: true,
    },
    {
      id: 3,
      nome: "Carla Souza",
      curso: "Serviço Social",
      email: "carla.souza@uni.edu",
      turno: "Noturno",
      periodo: "3º período",
      ativo: false,
    },
  ]);

  const filtered = useMemo(
    () =>
      estagiarios.filter((e) =>
        (e.nome + e.email).toLowerCase().includes(query.trim().toLowerCase())
      ),
    [estagiarios, query]
  );

  return (
    <div className="min-h-full pb-6">
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#3A0CA3] mb-1">
            Monitorar Estagiários
          </h1>
          <p className="text-sm text-[#6B7280]">
            Estagiários cadastrados no sistema.
          </p>
        </div>

        <div className="w-full sm:w-full max-w-sm">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Pesquisar por nome, curso ou e-mail"
          />
        </div>
      </header>

      <div
        className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
        style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
      >
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-sm text-[#6B7280]">
            Nenhum estagiário encontrado.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-xl p-4 border border-[#E6E7EA]"
                style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
              >
                <ProfileCard
                  id={e.id}
                  title={e.nome}
                  subtitle={e.email}
                  statusLabel={e.ativo ? "Ativo" : "Inativo"}
                  statusVariant={e.ativo ? "success" : "neutral"}
                  meta={[
                    { label: "Curso", value: e.curso },
                    { label: "Turno", value: e.turno },
                    { label: "Período", value: e.periodo },
                  ]}
                  onView={(id) => navigate(`/coordenacao/estagiarios/${id}`)}
                  onEdit={(id) => console.log("Editar", id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Estagiarios;
