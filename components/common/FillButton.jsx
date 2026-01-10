import { Loader2 } from "lucide-react";

export default function FillButton({
  children,
  icon: Icon,
  iconPosition = "left", // left | right
  bgColor = "var(--color-brand)",
  hoverBg = "var(--color-light)",
  textColor = "#FAFAFA",
  hoverText = "var(--color-brand)",
  loading = false,
  disabled = false,
}) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        "--btn-bg": bgColor,
        "--btn-hover-bg": hoverBg,
        "--btn-text": textColor,
        "--btn-hover-text": hoverText,
      }}
      className={`
        relative overflow-hidden
        font-bold text-[16px] leading-[24px]
        px-6 py-3 rounded-[28px]
        group cursor-pointer
        bg-[var(--btn-bg)]
        flex items-center gap-2
        transition-opacity
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      {/* Hover background */}
      <span
        className="
          absolute inset-0
          bg-[var(--btn-hover-bg)]
          translate-y-full
          transition-transform duration-300
          group-hover:translate-y-0
        "
      />

      {/* Content */}
      <span
        className="
          relative z-10
          flex items-center gap-2
          text-[var(--btn-text)]
          transition-colors duration-300
          group-hover:text-[var(--btn-hover-text)]
        "
      >
        {/* Left Icon */}
        {Icon && iconPosition === "left" && !loading && (
          <Icon size={18} strokeWidth={2} />
        )}

        {/* Loader */}
        {loading && <Loader2 size={18} className="animate-spin" />}

        {children}

        {/* Right Icon */}
        {Icon && iconPosition === "right" && !loading && (
          <Icon size={18} strokeWidth={2} />
        )}
      </span>
    </button>
  );
}
