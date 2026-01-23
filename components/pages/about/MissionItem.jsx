import MissionList from "./MissionList";

export default function MissionItem({hideBtn}) {
  return (
    <div className="max-w-xl">
      {/* Section Label */}
      <span className="block text-[16px] font-bold leading-5 text-brand mb-5 uppercase">
        Our Mission
      </span>

      {/* Title */}
      <h3 className="text-[28px] sm:text-[34px] md:text-[40px] leading-9 sm:leading-10.5 md:leading-12 font-bold text-dark mb-6 sm:mb-8 md:mb-10">
        {" "}
        Running with Purpose. Building a Greener Future.
      </h3>

      {/* Mission List */}
      <MissionList hideBtn={hideBtn} />
    </div>
  );
}
