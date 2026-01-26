"use client";

import LightGallery from "lightgallery/react";
import Image from "next/image";

// plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

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
        <a
          key={index}
          href={src}
          className="mb-4 break-inside-avoid block rounded-2xl overflow-hidden"
        >
          <Image
            src={src}
            alt={`Gallery image ${index + 1}`}
            width={400}
            height={300}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </a>
      ))}
    </LightGallery>
  );
}
