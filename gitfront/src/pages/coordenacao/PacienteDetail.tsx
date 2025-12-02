import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/cards/ProfileCard";
import BackButton from "../../components/ui/BackButton";

type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  ativo: boolean;
  observacoes?: string;
};

const PacienteDetail = () => {
  const { id } = useParams<{ id: string }>();

  const pacientes = useMemo<Paciente[]>(
    () => [
      {
        id: 1,
        nome: "Mariana Oliveira",
        email: "mariana.oliv@ex.com",
        telefone: "(11) 99999-0001",
        ativo: true,
        observacoes: "Acompanhamento mensal",
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
    ],
    []
  );

  const item = useMemo(
    () => pacientes.find((p) => String(p.id) === String(id)),
    [pacientes, id]
  );

  if (!item) {
    return (
      <div className="min-h-screen relative px-4 sm:px-6 py-6">
        <div className="bg-white rounded-xl p-3 sm:p-6 border border-[#E6E7EA] text-sm text-[#6B7280]">
          Paciente não encontrado.
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
    <div className="min-h-screen relative px-4 sm:px-6 py-6 pb-32">
      <header className="mb-6">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#3A0CA3]">
          {item.nome}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Detalhes do paciente
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
            { label: "Telefone", value: item.telefone },
            { label: "Status", value: item.ativo ? "Ativo" : "Inativo" },
            { label: "Observações", value: item.observacoes },
          ]}
          onView={() => {}}
          onEdit={(id) => console.log("Editar paciente", id)}
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

export default PacienteDetail;
