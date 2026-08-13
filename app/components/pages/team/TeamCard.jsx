import Image from "next/image";

const roleLabels = {
  admin: "Admin",
  advisor: "Advisor",
  core_team: "Core Team",
  coreTeam: "Core Team",
  member: "Member",
};

export default function TeamCard({ member, cardRef }) {
  const image = member.memberImage || member.user?.image || null;
  const role = roleLabels[member.memberType] || member.memberType || "Member";

  return (
    <div
      ref={cardRef}
      className="team-card group bg-[#E0F7F6] relative rounded-tl-full rounded-tr-full rounded-bl-xl rounded-br-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="h-1.5 w-full bg-brand absolute left-0 right-0 bottom-0 z-10" />

      <div className="rounded-full overflow-hidden relative aspect-square bg-gray-100">
        {image ? (
          <Image
            src={image}
            fill
            alt={member.name}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-[#00756F]/30">
              {(member.name || "?").charAt(0)}
            </span>
          </div>
        )}

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
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}