import { Loader2 } from "lucide-react";

export default function BorderButton({
  children,
  icon: Icon,
  iconPosition = "left",
  borderColor = "var(--color-light)",
  textColor = "var(--color-light)",
  hoverBg = "var(--color-light)",
  hoverText = "var(--color-brand)",
  loading = false,
  disabled = false,
  fullWidthOnMobile = true,
}) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        "--border": borderColor,
        "--text": textColor,
        "--hover-bg": hoverBg,
        "--hover-text": hoverText,
      }}
      className={`
        relative overflow-hidden
        font-bold rounded-full
        bg-transparent
        border border-border
        group
        flex items-center justify-center gap-2
        transition-opacity duration-300
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}

        /* Responsive */
        text-[14px] leading-5
        px-4 py-2
        sm:text-[15px] sm:leading-5.5 sm:px-5 sm:py-2.5
        md:text-[16px] md:leading-6 md:px-6 md:py-3
        ${fullWidthOnMobile ? "w-full sm:w-auto" : ""}
      `}
    >
      {/* Hover Fill (CENTER → OUT) */}
      <span
        className="
          absolute inset-0
          bg-[var(--hover-bg)]
          scale-x-0 origin-center
          transition-transform duration-300 ease-out
          group-hover:scale-x-100
        "
      />

      {/* Content */}
      <span
        className="
          relative z-10
          flex items-center gap-2
          text-[var(--text)]
          transition-colors duration-300
          group-hover:text-[var(--hover-text)]
        "
      >
        {/* Left Icon */}
        {!loading && Icon && iconPosition === "left" && (
          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        )}

        {/* Loader */}
        {loading && (
          <Loader2 className="w-4 h-4 sm:w-[18px] sm:h-[18px] animate-spin" />
        )}

        {children}

        {/* Right Icon */}
        {!loading && Icon && iconPosition === "right" && (
          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        )}
      </span>
    </button>
  );
}
