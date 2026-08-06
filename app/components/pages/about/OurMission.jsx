import DestinationIcon from "@/app/components/icons/DestinationIcon";
import AwardWin from "./AwardWin";
import MissionItem from "./MissionItem";

export default function OurMission({
  hideIcon,
  hideBtn,
  hideShape,
  hideRound,
  hideTopImage,
  hideSearch,
  data
}) {
 
  const image = data?.images?.list?.[0]?.full_path;
  const overImgText = data?.images?.list?.[0]?.short_title;

  return (
    console.log("OurMission Data:", data), // Debugging line to check the structure of data

    <section
      className="relative bg-cover bg-no-repeat bg-center py-16 sm:py-24 xl:py-36"
      style={{
        backgroundImage: "url('/static/bg-about.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className=" container mx-auto px-4 sm:px-6 lg:px-7.5 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center
        "
      >
        {/* Left Image Section */}
        <AwardWin hideShape={hideShape} hideRound={hideRound} hideTopImage={hideTopImage} image={image} overImgText={overImgText} />

        {/* Right Content */}
        <MissionItem hideBtn={hideBtn} data={data} />
      </div>
      {!hideIcon && (
        <div className=" absolute top-14 right-28 hidden  lg:block 2xl:block  ">
          <DestinationIcon />
        </div>
      )}
    </section>
  );
}
