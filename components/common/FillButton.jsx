export default function FillButton({ children }) {
  return (
    <button
      className="
        relative overflow-hidden
        font-bold text-[16px] leading-[24px]
        bg-[var(--color-brand)]
        px-6 py-3 rounded-[28px]
        group cursor-pointer
      "
    >
      {/* Text */}
      <span
        className="
          relative z-10
          text-[#FAFAFA]
          transition-colors duration-300
          group-hover:text-[var(--color-brand)]
        "
      >
        {children}
      </span>

      {/* Hover background */}
      <span
        className="
          absolute inset-0
          bg-[var(--color-light)]
          translate-y-full
          transition-transform duration-300
          group-hover:translate-y-0
        "
      />
    </button>
  );
}
