import Link from "next/link";

export default function HoverButton({
  children = "Click me",
  href = "",
  onClick = null,
  bgColor = "var(--color-light)",
  textColor = "var(--color-dark)",
  borderColor = "var(--color-brand)",
  hoverBgColor = "var(--color-brand)",
  hoverTextColor = "var(--color-white)",
  hoverBorderColor = "var(--color-dark)",
  size = "h-12 w-12", // default round size
  rounded = "rounded-full", // make button round
}) {
  const baseClasses = `
    inline-flex items-center justify-center
    ${size} ${rounded}
    border
    transition-all duration-500
    relative
    text-[${textColor}]
    bg-[${bgColor}]
    border-[${borderColor}]
    hover:text-[${hoverTextColor}]
    hover:bg-[${hoverBgColor}]
    hover:border-[${hoverBorderColor}]
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
