export default function FillButton({ children }) {
  return (
    <button
      className="
  relative overflow-hidden
  font-bold text-[16px] leading-[24px]
  bg-[var(--color-brand)] text-[var(--color-white)]
  px-6 py-3 rounded-[28px]
  group cursor-pointer
"
    >
      <span className="relative z-10">{children}</span>

      <span
        className="
    absolute inset-0 bg-[var(--color-dark)]
    translate-y-full transition-transform duration-300
    group-hover:translate-y-0
  "
      />
    </button>
  );
}
