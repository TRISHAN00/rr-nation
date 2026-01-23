import { Facebook, Linkedin, LinkedinIcon } from "lucide-react";
import Image from "next/image";

export default function TeamCard() {
  return (
    <div className="group bg-[#E0F7F6] relative rounded-tl-full rounded-tr-full rounded-bl-xl rounded-br-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Bottom bar */}
      <div className="h-1.5 w-full bg-brand absolute left-0 right-0 bottom-0 z-10" />

      {/* Image */}
      <div className="rounded-full overflow-hidden relative">
        <Image
          src="/dynamic/team/team-01.jpg"
          width={370}
          height={370}
          alt="run riseNation team"
          className="transition-transform duration-500 group-hover:scale-110 w-full h-full"
        />

        {/* Rotating Circle */}
        <div className="absolute inset-0 animate-spin-slow">
          <Image
            src="/static/team-circle.svg"
            width={370}
            height={370}
            alt="decorative circle"
            className=" w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="text-center px-4">
        <div className="mt-8 mb-6">
          <h4 className="text-lg sm:text-xl md:text-2xl font-medium">
            Connie Diaz
          </h4>
          <p className="text-xs sm:text-sm font-medium text-[#00756F] mt-1">
            CEO & FOUNDER
          </p>
        </div>

        {/* Social Icons */}
        <ul className="flex gap-4 pb-6 justify-center opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {[<Facebook />, <Linkedin />, <LinkedinIcon />].map((Icon, i) => (
            <li
              key={i}
              className="h-10 w-10 rounded-full bg-brand flex items-center justify-center hover:bg-[#00756F] transition-colors duration-300"
            >
              <a href="#" aria-label="social link">
                <Icon.type stroke="#fff" size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
