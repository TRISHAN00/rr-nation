import PhotoGalleryList from "./PhotoGalleryList";
import SearchSelect from "./SearchSelect";

export default function PhotoList() {
  const images = [
    "/dynamic/home/banner/banner-01.jpg",
    "/dynamic/event/event-01.jpg",
    "/dynamic/home/banner/banner-01.jpg",
    "/dynamic/home/banner/banner.jpg",
    "/dynamic/home/banner/banner-01.jpg",
    "/dynamic/home/banner/banner.jpg",
    "/dynamic/home/banner/banner-01.jpg",
    "/dynamic/home/banner/banner-01.jpg",
  ];

  return (
    <section className="pt-24 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 lg:pb-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row items-center sm:items-center sm:justify-between mb-10 sm:mb-12 lg:mb-14">
          <h3 className="text-dark font-bold 
            text-xl sm:text-2xl md:text-3xl lg:text-4xl 
            leading-snug lg:leading-tight max-w-2xl"
          >
            Latest Training Tips & Community Stories
          </h3>

          <div className="w-full sm:w-auto">
            <SearchSelect />
          </div>
        </div>

        {/* Gallery */}
        <PhotoGalleryList images={images} />
      </div>
    </section>
  );
}
