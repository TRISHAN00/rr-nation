import FillButton from "@/app/components/common/FillButton";
import BannerShapes from "@/app/components/common/ShapeIcon";
import RunIcon from "@/app/components/icons/RunIcon";
import Image from "next/image";
import Link from "next/link";

export default function MissionList({ hideBtn, points, buttonName, buttonSlug }) {
  return (
    <>
      {/* Mission Items */}
      <ul className="flex flex-col gap-8 sm:gap-10 border-b border-[#00A19A]/40 pb-8 sm:pb-9">
        {/* Item 1 */}
        {
          points?.map((point, index) => (
            <li key={index} className="flex gap-4 sm:gap-7.5 items-start">
              {/* Icon */}
              <div className="shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-brand flex items-center justify-center">
                <Image
                  src="/static/people-group.svg"
                  height={22}
                  width={16}
                  alt={point?.data?.title || "Mission Point"}
                />
              </div>
              {/* Content */}
              <div>
                <h6 className="text-[18px] sm:text-[24px] leading-6 sm:leading-7 font-bold text-dark mb-2 sm:mb-4">
                  {point?.data?.title}
                </h6>
                <p className="text-[14px] sm:text-[16px] leading-6 text-gray">
                  {point?.data?.description}
                </p>
              </div>
            </li>
          ))
        }
      </ul>

      {!hideBtn && (
        <div className="mt-8 sm:mt-10 relative w-fit mx-auto sm:ml-20">
          <Link href={buttonSlug || "#"} className="w-fit">
            <FillButton
              hoverBg="#001819"
              textColor="#FAFAFA"
              hoverText="#FAFAFA"
              iconPosition="right"
              gifIcon={<RunIcon icon="/static/marathon.gif" />}
            >
              {buttonName}
            </FillButton>
          </Link>

          {/* Decorative Shape */}
          <div className="hidden sm:flex justify-end absolute right-0 mt-1.5 -mr-25 animate-arrow-indicate">
            <BannerShapes type="indicator" />
          </div>
        </div>
      )}
    </>
  );
}
