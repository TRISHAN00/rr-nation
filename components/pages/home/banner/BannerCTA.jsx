import FillButton from "@/components/common/FillButton";
import VideoPlayBtn from "@/components/common/VideoPlayBtn";
import RunIcon from "@/components/icons/RunIcon";

export default function BannerCTA() {
  return (
    <div className=" w-2xl">
      <span
        className="
    font-bold
    text-[16px]
    leading-[20px]
    uppercase
    tracking-[0]
    text-[#00a19a]
    mb-5
  "
      >
        Run Rise Nation
      </span>

      <h1
        className="
    font-['Albert_Sans']
    font-black
    text-[62px]
    leading-[72px]
    tracking-[-0.02em]
    text-[#FAFAFA]
  "
      >
        Stride Together for a Better Tomorrow
      </h1>

      <p
        className="
    font-semibold
    text-[18px]
    leading-[28px]
    tracking-[0]
    mt-5
    mb-10
    text-[var(--color-light)]
  "
      >
        Join a growing community of runners committed to fitness,
        sustainability, and positive environmental impact.
      </p>

      <div className=" flex gap-8" >
        <FillButton
          hoverBg="#001819"
          textColor="#FAFAFA"
          hoverText="#FAFAFA"
          iconPosition="right"
          gifIcon={<RunIcon icon={"/static/marathon.gif"} />}
        >
          Start Running Today
        </FillButton>
        <VideoPlayBtn size={50} />
      </div>
    </div>
  );
}
