import clsx from "clsx";

export default function FillButton({
  children,
  icon: Icon,
  gifIcon,
  iconPosition = "left",
  bgColor = "var(--color-brand)",
  hoverBg = "var(--color-light)",
  textColor = "var(--color-white)",
  hoverText = "var(--color-brand)",
  loading = false,
  disabled = false,
  ...props // 👈 VERY IMPORTANT
}) {
  return (
    <button
      {...props} // 👈 allow DialogTrigger to inject onClick
      disabled={disabled || loading}
      style={{
        "--btn-bg": bgColor,
        "--btn-hover-bg": hoverBg,
        "--btn-text": textColor,
        "--btn-hover-text": hoverText,
      }}
      className={clsx(
        ` relative overflow-hidden rounded-full font-bold flex items-center justify-center gap-2 bg-(--btn-bg) transition-all duration-300 whitespace-nowrap min-w-fit text-[13px] px-4 py-2 sm:text-sm sm:px-5 sm:py-2.5 md:text-[15px] md:px-6 md:py-3 lg:text-[16px] lg:px-7 lg:py-3.5 group `,
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      )}
    >
      {/* Hover Fill */}
      <span className={`absolute inset-0 bg-(--btn-hover-bg) scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100`} />

      <span className="relative z-10 flex items-center gap-2 text-(--btn-text) transition-colors duration-300 group-hover:text-(--btn-hover-text)">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && children}
      </span>
    </button>
  );
}
