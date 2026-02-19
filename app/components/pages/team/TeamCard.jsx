import Image from "next/image";

export default function TeamCard({ member }) {
  return (
    <div className="group bg-[#E0F7F6] relative rounded-tl-full rounded-tr-full rounded-bl-xl rounded-br-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="h-1.5 w-full bg-brand absolute left-0 right-0 bottom-0 z-10" />

      <div className="rounded-full overflow-hidden relative aspect-square">
        <Image
          src={member.image}
          fill
          alt={member.name}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Rotating Circle Decoration */}
        <div className="absolute inset-0 animate-spin-slow pointer-events-none">
          <Image
            src="/static/team-circle.svg"
            width={370}
            height={370}
            alt="decorative circle"
            className="w-full h-full opacity-50"
          />
        </div>
      </div>

      <div className="text-center px-4">
        <div className="mt-8 mb-6">
          <h4 className="text-lg sm:text-xl font-bold text-gray-800">
            {member.name}
          </h4>
          <p className="text-xs sm:text-sm font-medium text-[#00756F] mt-1 uppercase tracking-wider">
            {member.role}
          </p>
        </div>

        {/* <ul className="flex gap-4 pb-6 justify-center opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {[Facebook, Linkedin, Twitter].map((Icon, i) => (
            <li
              key={i}
              className="h-9 w-9 rounded-full bg-brand flex items-center justify-center hover:bg-[#00756F] transition-colors duration-300"
            >
              <a href="#" aria-label="social link">
                <Icon color="#fff" size={16} />
              </a>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}