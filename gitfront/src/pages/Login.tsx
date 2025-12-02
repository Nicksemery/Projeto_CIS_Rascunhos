import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (role: "estagiario" | "coordenador") => {
    setError("");

    // TODO: Implementar chamada à API quando o backend estiver pronto
    console.log("Login:", { matricula, password, role });

    // Simulação de login - redireciona baseado na role
    if (role === "coordenador") {
      navigate("/coordenacao/dashboard");
    } else {
      navigate("/estagiario/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(180deg, #6A22FF 0%, #3A0CA3 100%)",
      }}
    >
      <div
        className="bg-white p-6 lg:p-8 rounded-xl w-full max-w-md border border-[#E6E7EA]"
        style={{
          boxShadow: "0 6px 18px rgba(18,18,18,0.06)",
        }}
      >
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-xxl lg:text-2xl font-bold text-[#3A0CA3] mb-2">
            C+S
          </h1>
          <p className="text-sm text-[#6B7280]">
            Faça login para acessar o sistema
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 lg:space-y-6"
        >
          {error && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-sm"
              style={{ boxShadow: "0 2px 6px rgba(18,18,18,0.04)" }}
            >
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="matricula"
              className="block text-sm font-medium text-[#3A0CA3] mb-1.5 lg:mb-2"
            >
              Matrícula
            </label>
            <input
              id="matricula"
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full px-3 lg:px-4 py-2.5 lg:py-2 text-base border border-[#E6E7EA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A22FF] focus:border-transparent transition"
              placeholder="Digite sua matrícula"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#3A0CA3] mb-1.5 lg:mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 lg:px-4 py-2.5 lg:py-2 text-base border border-[#E6E7EA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A22FF] focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSubmit("estagiario")}
              className="w-full bg-[#6A22FF] text-white py-3 lg:py-2 px-4 rounded-lg font-medium hover:bg-[#3A0CA3] focus:outline-none focus:ring-2 focus:ring-[#6A22FF] focus:ring-offset-2 transition text-base"
            >
              Entrar como Estagiário
            </button>

            <button
              type="button"
              onClick={() => handleSubmit("coordenador")}
              className="w-full bg-white text-[#6A22FF] py-3 lg:py-2 px-4 rounded-lg font-medium border-2 border-[#6A22FF] hover:bg-[#6A22FF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6A22FF] focus:ring-offset-2 transition text-base"
            >
              Entrar como Coordenador
            </button>
          </div>
        </form>

        <div className="mt-4 lg:mt-6 text-center text-xs lg:text-sm text-[#6B7280]">
          <p>Sistema de Estágio em Psicologia</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
