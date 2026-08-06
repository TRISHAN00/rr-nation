"use client";
import FillButton from "@/app/components/common/FillButton";
import RunIcon from "@/app/components/icons/RunIcon";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const VideoModalGallery = dynamic(
  () => import("@/app/components/common/VideoModalGallery"),
  { ssr: false },
);

export default function BannerCTA({ data }) {
  const overLine = data?.section_data?.overline_text;
  const subtitle = data?.section_data?.subtitle;
  const description = data?.section_data?.description;
  const buttonName = data?.section_data?.banner_button_name;
  const buttonSlug = data?.section_data?.banner_button_slug;
  const ytBtnName = data?.section_data?.yt_video_btn_name;
  const ytLink = data?.section_data?.yt_video_link;
  const ytHeadline = data?.section_data?.yt_video_headline;


  return (
    <div className=" w-2xl">
      {overLine && <span className="block font-bold text-[14px] sm:text-[16px] leading-5 uppercase text-brand mb-4 sm:mb-5">
        {overLine}
      </span>}

      {/* Heading */}
      {subtitle &&
        < h1 className="font-['Albert_Sans'] font-black text-[34px] sm:text-[44px] lg:text-[62px] leading-10.5 sm:leading-13.5 lg:leading-18 tracking-[-0.02em] text-[#FAFAFA]">
          {subtitle}
        </h1>}

      {/* Description */}
      {description && <p className="font-semibold text-[15px] sm:text-[16px] lg:text-[18px] leading-6 sm:leading-6.5 lg:leading-7 mt-4 sm:mt-5 mb-8 sm:mb-10 text-light">
        {description}
      </p>}




      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
        <Link href={buttonSlug}>
          <FillButton
            hoverBg="#f090008f"
            textColor="#FAFAFA"
            hoverText="#FAFAFA"
            iconPosition="right"
            gifIcon={<RunIcon icon="/static/marathon.gif" />}
          >
            {buttonName}
          </FillButton>
        </Link>
        <Suspense fallback={null}>
          <VideoModalGallery ytBtnName={ytBtnName} ytLink={ytLink} ytHeadline={ytHeadline} />
        </Suspense>
      </div>
    </div >
  );
}
