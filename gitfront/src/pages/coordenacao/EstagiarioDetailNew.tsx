import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/cards/ProfileCard";
import BackButton from "../../components/ui/BackButton";

type Estagiario = {
  id: number;
  nome: string;
  curso: string;
  email: string;
  telefone?: string;
  turno?: string;
  periodo?: string;
  ativo: boolean;
  observacoes?: string;
};

const EstagiarioDetail = () => {
  const { id } = useParams<{ id: string }>();

  const estagiarios = useMemo<Estagiario[]>(
    () => [
      {
        id: 1,
        nome: "Ana Silva",
        curso: "Psicologia",
        email: "ana.silva@uni.edu",
        telefone: "(11) 91234-0001",
        turno: "Matutino",
        periodo: "4º período",
        ativo: true,
        observacoes: "Ótimo desempenho",
      },
      {
        id: 2,
        nome: "Bruno Costa",
        curso: "Psicologia",
        email: "bruno.costa@uni.edu",
        telefone: "(11) 98877-0002",
        turno: "Vespertino",
        periodo: "5º período",
        ativo: true,
      },
    ],
    []
  );

  const item = useMemo(
    () => estagiarios.find((e) => String(e.id) === String(id)),
    [estagiarios, id]
  );

  if (!item) {
    return (
      <div className="min-h-full relative px-4 sm:px-6 py-6">
        <div className="bg-white rounded-xl p-3 sm:p-6 border border-[#E6E7EA] text-sm text-[#6B7280]">
          Estagiário não encontrado.
        </div>

        <div
          className="absolute left-6 bottom-6 px-4 py-2 rounded-full bg-[#6A22FF] text-white border border-[#6A22FF] hover:bg-[#3A0CA3] font-medium shadow-thin transition"
          style={{ zIndex: 20 }}
        >
          <BackButton
            label="Voltar"
            className="flex items-center gap-2 text-white hover:text-white/80"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full relative px-4 sm:px-6 py-6 pb-32">
      <header className="mb-6">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#3A0CA3]">
          {item.nome}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Detalhes do estagiário
        </p>
      </header>

      <div
        className="bg-white rounded-xl p-3 sm:p-4 border border-[#E6E7EA]"
        style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
      >
        <ProfileCard
          id={item.id}
          title={item.nome}
          subtitle={item.email}
          statusLabel={item.ativo ? "Ativo" : "Inativo"}
          statusVariant={item.ativo ? "success" : "neutral"}
          meta={[
            { label: "Curso", value: item.curso },
            { label: "Turno", value: item.turno },
            { label: "Período", value: item.periodo },
            { label: "Telefone", value: item.telefone },
            { label: "Observações", value: item.observacoes },
          ]}
          onView={() => {}}
          onEdit={(id) => console.log("Editar estagiário", id)}
        />
      </div>

      <div
        className="absolute left-6 bottom-6 px-4 py-2 rounded-full bg-[#6A22FF] text-white border border-[#6A22FF] hover:bg-[#3A0CA3] font-medium shadow-thin transition"
        style={{ zIndex: 20 }}
      >
        <BackButton
          label="Voltar"
          className="flex items-center gap-2 text-white hover:text-white/80"
        />
      </div>
    </div>
  );
};

export default EstagiarioDetail;
