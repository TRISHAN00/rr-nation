import PhotoGalleryList from "./PhotoGalleryList";

export default function PhotoList() {
const images = [
  "/dynamic/gallery/1.jpg",
  "/dynamic/gallery/2.jpg",
  "/dynamic/gallery/3.jpg",
  "/dynamic/gallery/4.jpg",
  "/dynamic/gallery/5.jpg",
  "/dynamic/gallery/6.jpg",
  "/dynamic/gallery/7.jpg",
  "/dynamic/gallery/8.jpg",
  "/dynamic/gallery/9.jpg",
  "/dynamic/gallery/10.jpg",
  "/dynamic/gallery/11.jpg",
  "/dynamic/gallery/12.jpg",
  "/dynamic/gallery/13.jpg",
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
            Moments we Cherish
          </h3>

          {/* <div className="w-full sm:w-auto">
            <SearchSelect />
          </div> */}
        </div>

        {/* Gallery */}
        <PhotoGalleryList images={images} />
      </div>
    </section>
  );
}
