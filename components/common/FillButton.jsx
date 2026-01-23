import clsx from "clsx";
import { Loader2 } from "lucide-react";

export default function FillButton({
  children,
  icon: Icon,
  gifIcon,
  iconPosition = "left",
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
      className={clsx(`
        relative overflow-hidden
        font-bold
        rounded-full
        bg-(--btn-bg)
        flex items-center justify-center gap-2
        group transition-all duration-300
        whitespace-nowrap

        /* Responsive sizing */
        text-sm px-4 py-2
        sm:text-[15px] sm:px-5 sm:py-2.5
        md:text-[16px] md:px-6 md:py-3

        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
      `)}
    >
      {/* Hover Background */}
      <span
        className={clsx(`absolute inset-0
          bg-(--btn-hover-bg)
          translate-y-full
          transition-transform duration-300
          group-hover:translate-y-0`)}
      />

      {/* Content */}
      <span
        className={clsx(`relative z-10
          flex items-center gap-2
          text-(--btn-text)
          transition-colors duration-300
          group-hover:text`)}
      >
        {/* Left Icon */}
        {!loading && iconPosition === "left" && Icon && (
          <Icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
        )}
        {!loading && iconPosition === "left" && gifIcon && (
          <span className="w-4 h-4 md:w-5 md:h-5">{gifIcon}</span>
        )}

        {/* Loader */}
        {loading && (
          <Loader2 className="w-4 h-4 md:w-4.5 md:h-4.5 animate-spin" />
        )}

        {children}

        {/* Right Icon */}
        {!loading && iconPosition === "right" && Icon && (
          <Icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
        )}
        {!loading && iconPosition === "right" && gifIcon && (
          <span className="w-4 h-4 md:w-5 md:h-5">{gifIcon}</span>
        )}
      </span>
    </button>
  );
}
