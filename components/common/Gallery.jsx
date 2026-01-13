"use client";

import lgVideo from "lightgallery/plugins/video";
import LightGallery from "lightgallery/react";
import { useRef } from "react";

import "lightgallery/css/lg-video.css";
import "lightgallery/css/lightgallery.css";

import VideoPlayBtn from "./VideoPlayBtn";

export default function Gallery() {
  const lightGalleryRef = useRef(null);

  const onInit = (detail) => {
    if (detail) {
      lightGalleryRef.current = detail.instance;
    }
  };

  const openVideo = () => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(0);
    }
  };

  const videos = [
    {
      src: "https://www.youtube.com/watch?v=IUN664s7N-c",
      subHtml: "<h4>Peck Pocketed – Disney Favorite</h4>",
    },
  ];

  return (
    <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
      {/* Play Button */}
      <VideoPlayBtn
        openVideo={openVideo}
        size={44} // base size
        className="
          scale-90 
          sm:scale-100 
          md:scale-110 
          lg:scale-125
        "
      />

      {/* LightGallery (hidden, modal only) */}
      <LightGallery
        onInit={onInit}
        plugins={[lgVideo]}
        dynamic
        dynamicEl={videos}
        closable
        hash={false}
      />
    </div>
  );
}
