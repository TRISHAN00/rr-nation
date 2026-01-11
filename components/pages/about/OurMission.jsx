import AwardWin from "./AwardWin";
import MissionItem from "./MissionItem";

export default function OurMission() {
  return (
    <section
      className="bg-cover bg-no-repeat bg-center pt-36 pb-36"
      style={{
        backgroundImage: "url('/static/bg-about.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto px-[30px] grid grid-cols-2 gap-10">
        {/* Left Image Section */}
        <AwardWin />

        {/* Right Content */}
        <MissionItem />

      </div>
    </section>
  );
}
