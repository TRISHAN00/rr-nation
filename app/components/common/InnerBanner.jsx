import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InnerBanner({
  title = "",
  background = "",
  breadcrumbs = [],
  overlay = "bg-black/30",
}) {
  return (
    <section
      className={`relative flex items-end justify-center sm:justify-start h-80 sm:h-105 md:h-120 lg:h-137.5 bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url('${background}')` }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />

      {/* Content */}
      <div className="relative z-10 mb-10 sm:mb-14 lg:mb-20 px-4 sm:px-8 lg:px-16 text-center sm:text-left w-full">
        <h2 className="text-2xl text-center sm:text-3xl md:text-4xl lg:text-[46px] font-bold text-white mb-3 sm:mb-4 leading-tight">
          {title}
        </h2>

        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <ul className="flex items-center justify-center gap-2 text-sm sm:text-base text-white font-medium">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className="opacity-90">{item.label}</span>
                )}

                {index !== breadcrumbs.length - 1 && (
                  <ArrowRight size={14} className="opacity-80" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
