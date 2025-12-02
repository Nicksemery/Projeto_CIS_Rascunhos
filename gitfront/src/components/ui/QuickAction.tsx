import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode; // icon
  ariaLabel?: string;
}

const QuickAction = ({
  title,
  subtitle,
  onClick,
  className = "",
  children,
  ariaLabel,
}: Props) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || title}
      className={
        "p-4 border-2 border-dashed border-[#E6E7EA] rounded-xl hover:border-[#6A22FF] hover:bg-[#F7F7F8] transition text-left group " +
        className
      }
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg shrink-0 bg-[#6A22FF] group-hover:bg-[#3A0CA3] transition">
          {children}
        </div>

        <div className="min-w-0">
          <p className="font-medium text-sm lg:text-base text-[#3A0CA3] group-hover:text-[#6A22FF] transition">
            {title}
          </p>
          {subtitle && (
            <p className="text-xs lg:text-sm text-[#6B7280] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default QuickAction;
