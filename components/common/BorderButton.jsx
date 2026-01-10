
export default function BorderButton({children}) {
  return (
    <button
        className="
  relative overflow-hidden
  px-6 py-3 rounded-[28px]
  font-bold text-[16px] leading-[24px]
  text-[var(--color-light)] bg-transparent
  border border-[var(--color-light)]
  group
  transition-colors duration-300 cursor-pointer
"
      >
        {/* Button Text */}
        <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--color-brand)]">
          {children}
        </span>

        {/* Hover Slide Background */}
        <span
          className="
    absolute inset-0 bg-[var(--color-light)]
    -translate-y-full transition-transform duration-300
    group-hover:translate-y-0
    z-0
  "
        />
      </button>
  )
}
