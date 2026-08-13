"use client";

import LightGallery from "lightgallery/react";
import Image from "next/image";
import { useState } from "react";

// plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

function GalleryImage({ src, index }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <a
      href={src?.full_path}
      className="mb-4 break-inside-avoid block rounded-2xl overflow-hidden relative bg-gray-100"
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />
      )}
      <Image
        src={src?.full_path}
        alt={`Gallery image ${index + 1}`}
        width={400}
        height={300}
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto object-cover transition-all duration-500 ${
          loaded
            ? "opacity-100 hover:scale-105"
            : "opacity-0"
        }`}
      />
    </a>
  );
}

export default function PhotoGalleryList({ images }) {
  return (
    <LightGallery
      speed={500}
      plugins={[lgZoom, lgThumbnail]}
      mobileSettings={{
        controls: true,
        showCloseIcon: true,
        download: true,
        rotate: true,
      }}
      elementClassNames="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4 md:px-16 relative z-10"
    >
      {images.map((src, index) => (
        <GalleryImage key={index} src={src} index={index} />
      ))}
    </LightGallery>
  );
}
