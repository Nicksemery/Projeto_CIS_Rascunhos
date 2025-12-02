import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import CoordenacaoLayout from "./components/layouts/CoordenacaoLayout";
import EstagiarioLayout from "./components/layouts/EstagiarioLayout";
import Dashboard from "./pages/coordenacao/Dashboard";
import AgendarConsulta from "./pages/coordenacao/AgendarConsulta";
import CadastrarEstagiario from "./pages/coordenacao/CadastrarEstagiario";
import Estagiarios from "./pages/coordenacao/Estagiarios";
import EstagiarioDetail from "./pages/coordenacao/EstagiarioDetail";
import Pacientes from "./pages/coordenacao/Pacientes";
import PacienteDetail from "./pages/coordenacao/PacienteDetail";
import AutorizarSessoes from "./pages/coordenacao/AutorizarSessoes";
import Relatorios from "./pages/coordenacao/Relatorios";
import SessoesPendentes from "./pages/coordenacao/SessoesPendentes";
import EstagiarioDashboard from "./pages/estagiario/Dashboard";
import MeusPacientes from "./pages/estagiario/MeusPacientes";
import MinhasSessoes from "./pages/estagiario/MinhasSessoes";
import MeusRelatorios from "./pages/estagiario/MeusRelatorios";
import EstagiarioPacienteDetail from "./pages/estagiario/PacienteDetail";
import RegistrarSessao from "./pages/estagiario/RegistrarSessao";
import EncontrarPacientes from "./pages/estagiario/EncontrarPacientes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/coordenacao" element={<CoordenacaoLayout />}>
          <Route path="dashboard" element={<Dashboard />}>
            {" "}
            {/* Nested outlet para subpáginas */}
            <Route path="agendar-consulta" element={<AgendarConsulta />} />
            <Route
              path="cadastrar-estagiario"
              element={<CadastrarEstagiario />}
            />
          </Route>
          <Route path="estagiarios" element={<Estagiarios />} />
          <Route path="estagiarios/:id" element={<EstagiarioDetail />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="pacientes/:id" element={<PacienteDetail />} />
          <Route path="autorizar-sessoes" element={<AutorizarSessoes />} />
          <Route path="sessoes-pendentes" element={<SessoesPendentes />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        <Route path="/estagiario" element={<EstagiarioLayout />}>
          <Route path="dashboard" element={<EstagiarioDashboard />} />
          <Route path="meus-pacientes" element={<MeusPacientes />} />
          <Route
            path="meus-pacientes/:id"
            element={<EstagiarioPacienteDetail />}
          />
          <Route path="encontrar-pacientes" element={<EncontrarPacientes />} />
          <Route path="minhas-sessoes" element={<MinhasSessoes />} />
          <Route path="registrar-sessao" element={<RegistrarSessao />} />
          <Route path="meus-relatorios" element={<MeusRelatorios />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
