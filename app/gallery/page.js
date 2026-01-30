import InnerBanner from "@/components/common/InnerBanner";
import PhotoList from "@/components/pages/gallery/PhotoList";

export const metadata = {
  title: "Photo Gallery | RunRise Nation Race Highlights",
  description: "Relive the best moments from our marathons and events. Browse through photos of the RunRise Nation community in action across Bangladesh.",
  keywords: ["RunRise Nation Gallery", "Running Photos Bangladesh", "Marathon Highlights", "RRN Event Photos", "Dhaka Running Community Images"],
  openGraph: {
    title: "RunRise Nation Gallery - Capturing Every Milestone",
    description: "Explore photos from our latest events. See the energy, the effort, and the triumphs of our runners.",
    type: "website",
    images: [
      {
        url: "/dynamic/about/inner-banner.jpg", // A collage of runners would be perfect here
        width: 1200,
        height: 630,
        alt: "RunRise Nation Event Gallery",
      },
    ],
  },
};

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
