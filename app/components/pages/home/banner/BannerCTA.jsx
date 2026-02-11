"use client";
import FillButton from "@/app/components/common/FillButton";
import RunIcon from "@/app/components/icons/RunIcon";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const VideoModalGallery = dynamic(
  () => import("@/app/components/common/VideoModalGallery"),
  { ssr: false },
);

export default function BannerCTA() {
  const isAuthenticated = useAuth();
  return (
    <div className=" w-2xl">
      <span className="block font-bold text-[14px] sm:text-[16px] leading-5 uppercase text-brand mb-4 sm:mb-5">
        Run Rise Nation
      </span>
      {isAuthenticated ? "USER AUTHENTICATED" : "PLEASE LOG IN"}

      {/* Heading */}
      <h1 className="font-['Albert_Sans'] font-black text-[34px] sm:text-[44px] lg:text-[62px] leading-10.5 sm:leading-13.5 lg:leading-18 tracking-[-0.02em] text-[#FAFAFA]">
        Stride Together for a Better Tomorrow
      </h1>
      {/* Description */}
      <p className="font-semibold text-[15px] sm:text-[16px] lg:text-[18px] leading-6 sm:leading-6.5 lg:leading-7 mt-4 sm:mt-5 mb-8 sm:mb-10 text-light">
        Join a passionate community where movement meets purpose. Experience the best, and become the best version of yourself.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
        <Link href={"/events"}>
          <FillButton
            hoverBg="#f090008f"
            textColor="#FAFAFA"
            hoverText="#FAFAFA"
            iconPosition="right"
            gifIcon={<RunIcon icon="/static/marathon.gif" />}
          >
            Start Running Today
          </FillButton>
        </Link>

        {/* Video CTA */}

        <Suspense fallback={null}>
          <VideoModalGallery />
        </Suspense>
      </div>
    </div>
  );
}
