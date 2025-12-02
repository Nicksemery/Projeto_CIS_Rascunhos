import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  label?: string;
  to?: string;
  className?: string;
}

/**
 * Componente de botão voltar reutilizável.
 * Por padrão navega para trás no histórico (navigate(-1)).
 * Se `to` for fornecido, navega para essa rota específica.
 */
const BackButton = ({ label = "Voltar", to, className }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={
        className ||
        "inline-flex items-center gap-2 text-sm text-[#6A22FF] hover:text-[#3A0CA3] transition"
      }
      aria-label={label}
      title={label}
    >
      <FaArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
};

export default BackButton;
