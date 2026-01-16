import Image from "next/image";

export default function JourneyItem({ icon, title, text }) {
  return (
    <div className="text-center max-w-xs">
      {/* Icon Circle */}
      <div className="relative flex justify-center mb-8">
          <Image src={icon} alt={title} width={140} height={140} />
      </div>

      <h4 className="text-xl font-bold text-dark mb-3">{title}</h4>
      <p className="text-gray text-sm leading-6">{text}</p>
    </div>
  );
}
