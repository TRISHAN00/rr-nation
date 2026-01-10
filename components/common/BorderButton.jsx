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
        font-bold
        rounded-[28px]
        bg-transparent
        border border-[var(--border)]
        group cursor-pointer
        flex items-center justify-center gap-2
        transition-opacity duration-300
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}

        /* Responsive */
        text-[14px] leading-[20px]
        px-4 py-2
        sm:text-[15px] sm:leading-[22px] sm:px-5 sm:py-2.5
        md:text-[16px] md:leading-[24px] md:px-6 md:py-3
        ${fullWidthOnMobile ? "w-full sm:w-auto" : ""}
      `}
    >
      {/* Hover Background (Bottom → Top) */}
      <span
        className="
          absolute inset-0
          bg-[var(--hover-bg)]
          translate-y-full
          transition-transform duration-300 ease-out
          group-hover:translate-y-0
          z-0
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
        {Icon && iconPosition === "left" && !loading && (
          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        )}

        {/* Loader */}
        {loading && (
          <Loader2 className="w-4 h-4 sm:w-[18px] sm:h-[18px] animate-spin" />
        )}

        {children}

        {/* Right Icon */}
        {Icon && iconPosition === "right" && !loading && (
          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        )}
      </span>
    </button>
  );
}
