import FillButton from "@/components/common/FillButton";
import RunIcon from "@/components/icons/RunIcon";
import BannerShapes from "@/components/common/ShapeIcon";
import Image from "next/image";

export default function MissionList() {
  return (
    <>
      <ul className="flex flex-col gap-10 border-b border-[#00A19A]/40 pb-9">
        {/* Item */}
        <li className="flex gap-[30px] items-start">
          {/* Icon */}
          <div className="flex-shrink-0 h-12 w-12 rounded-full border border-[#00a19a] flex items-center justify-center">
            <Image
              src="/static/people-group.svg"
              height={25}
              width={18}
              alt="Safe Environment"
            />
          </div>

          {/* Content */}
          <div>
            <h6 className="text-[24px] leading-7 font-bold text-[#001819] mb-4">
              Safe Environment
            </h6>
            <p className="text-[16px] leading-[24px] text-[#868681]">
              RunRise Nation is a passionate running community built on fitness,
              endurance, and togetherness.
            </p>
          </div>
        </li>

        {/* Item */}
        <li className="flex gap-[30px] items-start">
          <div className="flex-shrink-0 h-12 w-12 rounded-full border border-[#00a19a] flex items-center justify-center">
            <Image
              src="/static/people-group.svg"
              height={25}
              width={18}
              alt="Eco-conscious running events"
            />
          </div>

          <div>
            <h6 className="text-[24px] leading-7 font-bold text-[#001819] mb-4">
              Eco-conscious Running Events
            </h6>
            <p className="text-[16px] leading-[24px] text-[#868681]">
              RunRise Nation goes beyond hosting races—it builds a culture of
              discipline, health, and perseverance.
            </p>
          </div>
        </li>
      </ul>
      <div className=" mt-10 ml-20 relative w-fit">
        <FillButton
          hoverBg="#001819"
          textColor="#FAFAFA"
          hoverText="#FAFAFA"
          iconPosition="right"
          gitIcon={<RunIcon/>}
        >
          Start Running Today
          
        </FillButton>

        <div className="flex justify-end absolute right-0 mt-1.5 mr-[-100px] ">
          <BannerShapes type="indicator" />
        </div>
      </div>
    </>
  );
}
