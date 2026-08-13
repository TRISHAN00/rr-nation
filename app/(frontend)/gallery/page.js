import InnerBanner from "@/app/components/common/InnerBanner";
import PhotoList from "@/app/components/pages/gallery/PhotoList";
import { getApi } from "../api/page-api";

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

export default async function GalleryPage() {
  const apiValue = "gallery-page";
  const galleryData = await getApi(apiValue);

  const bannerData = galleryData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "gallery-page-banner"
  );

  const galleryImages = galleryData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "moments-we-cherish"
  );



  return (
    <>
      <InnerBanner
        title={bannerData?.section_data?.subtitle}
        background={bannerData?.images?.list?.[0]?.full_path}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <PhotoList data={galleryImages} />
    </>
  );
}
