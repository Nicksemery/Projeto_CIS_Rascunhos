type StatusVariant = "success" | "neutral" | "danger";

type Props = {
  id: number | string;
  title: string; // primary text (e.g., nome)
  subtitle?: string; // secondary text (e.g., email)
  statusLabel?: string;
  statusVariant?: StatusVariant;
  // Generic meta items to render inside the card (label + value).
  meta?: Array<{ label: string; value?: string | number }>;
  onView?: (id: number | string) => void;
  onEdit?: (id: number | string) => void;
};

const statusClasses = (variant: StatusVariant | undefined) => {
  switch (variant) {
    case "success":
      return "bg-green-100 text-green-700";
    case "danger":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// Componente genérico para cards de perfil/entidade. Reutilizável para estagiários, pacientes, etc.
const ProfileCard = ({
  id,
  title,
  subtitle,
  statusLabel,
  statusVariant,
  meta,
  onView,
  onEdit,
}: Props) => {
  return (
    <div
      className="p-6 rounded-lg border border-[#F1F1F2] bg-white"
      style={{ boxShadow: "0 6px 18px rgba(18,18,18,0.06)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-[#3A0CA3]">{title}</p>
          {subtitle && (
            <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>
          )}
        </div>

        {statusLabel && (
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs ${statusClasses(
                statusVariant
              )}`}
            >
              {statusLabel}
            </span>
          </div>
        )}
      </div>

      {meta && meta.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {meta.map((m, idx) => (
            <div key={idx}>
              <h4 className="text-xs text-[#6B7280] font-medium mb-1">
                {m.label}
              </h4>
              <p className="text-[#3A0CA3]">{m.value ?? "—"}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => onView?.(id)}
          className="px-3 py-1 rounded-full bg-[#6A22FF] text-white text-sm hover:bg-[#3A0CA3] transition"
        >
          Ver
        </button>

        <button
          onClick={() => onEdit?.(id)}
          className="px-3 py-1 rounded-full border border-[#E6E7EA] text-sm text-[#6B7280] hover:bg-[#F7F7F8] transition"
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
