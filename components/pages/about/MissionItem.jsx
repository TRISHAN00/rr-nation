import MissionList from "./MissionList";

export default function MissionItem() {
  return (
    <div className="max-w-xl">
      {/* Section Label */}
      <span className="block text-[16px] font-bold leading-5 text-[#00a19a] mb-5 uppercase">
        Our Mission
      </span>

      {/* Title */}
      <h3 className="text-[40px] leading-[48px] font-bold text-[#001819] mb-10">
        Running with Purpose. Building a Greener Future.
      </h3>

      {/* Mission List */}
      <MissionList />

    </div>
  );
}
