"use client";

import lgVideo from "lightgallery/plugins/video";
import dynamic from "next/dynamic";
import { useRef } from "react";
import VideoPlayBtn from "./VideoPlayBtn";

// ✅ Only import LightGallery on the client
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

import "lightgallery/css/lg-video.css";
import "lightgallery/css/lightgallery.css";

export default function VideoModalGallery() {
  const lightGalleryRef = useRef(null);

  const onInit = (detail) => {
    if (detail) lightGalleryRef.current = detail.instance;
  };

  const openVideo = () => {
    lightGalleryRef.current?.openGallery(0);
  };

  const videos = [
    {
      src: "https://youtu.be/hWfn751NQys?si=BiQX4YZbyPPd4uN_",
      subHtml: "<h4>অনুষ্ঠিত হলো দৌড় প্রতিযোগিতা রানরাইজ নেশন ফিফটিন-কে ২০২৫ | RunRise Marathon | Jamuna TV</h4>",
    },
  ];

  return (
    <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
      <VideoPlayBtn
        openVideo={openVideo}
        size={44}
        className="scale-90 sm:scale-100 md:scale-110 lg:scale-125"
      />

      {/* Only render LightGallery on client */}
      {typeof window !== "undefined" && (
        <LightGallery
          onInit={onInit}
          plugins={[lgVideo]}
          dynamic
          dynamicEl={videos}
          closable
          hash={false}
        />
      )}
    </div>
  );
}
