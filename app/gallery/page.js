import InnerBanner from "@/components/common/InnerBanner";
import PhotoList from "@/components/pages/gallery/PhotoList";

export default function GalleryPage() {
  return (
    <>
      <InnerBanner
        title="Gallery"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <PhotoList/>
    </>
  );
}
