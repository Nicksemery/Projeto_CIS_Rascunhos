import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Pesquisar",
  className = "",
  ariaLabel,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <label className={`relative block ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full pl-3 pr-8 py-2 rounded-lg border border-[#E6E7EA] text-sm focus:outline-none focus:ring-2 focus:ring-[#6A22FF] focus:border-transparent"
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
      />

      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </label>
  );
};

export default SearchBar;
