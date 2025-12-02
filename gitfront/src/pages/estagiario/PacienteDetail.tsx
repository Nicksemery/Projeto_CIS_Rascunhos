import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendar, FaClock, FaFileAlt } from "react-icons/fa";
import BackButton from "../../components/ui/BackButton";

type Sessao = {
  id: number;
  data: string;
  horario: string;
  tipo: string;
  status: "Agendada" | "Concluída" | "Cancelada";
};

type Relatorio = {
  id: number;
  sessaoData: string;
  dataEnvio: string;
  status: "Pendente" | "Aprovado" | "Em Revisão";
};

const PacienteDetail = () => {
  const { id } = useParams();

  // Mock de dados do paciente
  const [paciente] = useState({
    id: Number(id),
    nome: "Mariana Oliveira",
    email: "mariana.oliv@ex.com",
    telefone: "(11) 99999-0001",
    dataNascimento: "15/03/1998",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    inicioTratamento: "10/09/2025",
    diagnostico: "Transtorno de Ansiedade Generalizada",
  });

  // Mock de sessões
  const [sessoes] = useState<Sessao[]>([
    {
      id: 1,
      data: "05/12/2025",
      horario: "14:00",
      tipo: "Terapia Individual",
      status: "Agendada",
    },
    {
      id: 2,
      data: "28/11/2025",
      horario: "14:00",
      tipo: "Terapia Individual",
      status: "Concluída",
    },
    {
      id: 3,
      data: "21/11/2025",
      horario: "14:00",
      tipo: "Terapia Individual",
      status: "Concluída",
    },
  ]);

  // Mock de relatórios
  const [relatorios] = useState<Relatorio[]>([
    {
      id: 1,
      sessaoData: "28/11/2025",
      dataEnvio: "28/11/2025",
      status: "Pendente",
    },
    {
      id: 2,
      sessaoData: "21/11/2025",
      dataEnvio: "21/11/2025",
      status: "Aprovado",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agendada":
        return "bg-blue-100 text-blue-700";
      case "Concluída":
        return "bg-green-100 text-green-700";
      case "Cancelada":
        return "bg-red-100 text-red-700";
      case "Pendente":
        return "bg-yellow-100 text-yellow-700";
      case "Aprovado":
        return "bg-green-100 text-green-700";
      case "Em Revisão":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Botão Voltar */}
      <div className="hidden lg:block">
        <BackButton
          label="Voltar"
          to="/estagiario/meus-pacientes"
          className="text-purple-600 hover:text-purple-700"
        />
      </div>

      {/* Cabeçalho */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          {paciente.nome}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-600">
          <div>
            <p className="text-sm font-medium text-gray-500">E-mail</p>
            <p className="text-base">{paciente.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Telefone</p>
            <p className="text-base">{paciente.telefone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Data de Nascimento
            </p>
            <p className="text-base">{paciente.dataNascimento}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Início do Tratamento
            </p>
            <p className="text-base">{paciente.inicioTratamento}</p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-gray-500">Endereço</p>
            <p className="text-base">{paciente.endereco}</p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-gray-500">Diagnóstico</p>
            <p className="text-base">{paciente.diagnostico}</p>
          </div>
        </div>
      </div>

      {/* Sessões */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sessões</h2>
          <span className="text-sm text-gray-500">
            Total: {sessoes.length} sessões
          </span>
        </div>

        <div className="space-y-3">
          {sessoes.map((sessao) => (
            <div
              key={sessao.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <FaCalendar className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{sessao.data}</span>
                  <FaClock className="w-4 h-4 text-gray-400 ml-2" />
                  <span>{sessao.horario}</span>
                </div>
                <p className="text-sm text-gray-600">{sessao.tipo}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-lg font-medium text-sm ${getStatusColor(
                  sessao.status
                )}`}
              >
                {sessao.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Relatórios */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Relatórios</h2>
          <span className="text-sm text-gray-500">
            Total: {relatorios.length} relatórios
          </span>
        </div>

        <div className="space-y-3">
          {relatorios.map((relatorio) => (
            <div
              key={relatorio.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <FaFileAlt className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Relatório #{relatorio.id}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Sessão: {relatorio.sessaoData}</p>
                  <p>Enviado em: {relatorio.dataEnvio}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${getStatusColor(
                    relatorio.status
                  )}`}
                >
                  {relatorio.status}
                </span>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PacienteDetail;
