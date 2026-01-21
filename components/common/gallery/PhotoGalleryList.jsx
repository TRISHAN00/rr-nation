import Image from "next/image";

export default function PhotoGalleryList({images}) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4 md:px-16 relative z-10">
          {images.map((src, index) => (
            <div
              key={index}
              className="mb-4 break-inside-avoid rounded-2xl overflow-hidden"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
  )
}
