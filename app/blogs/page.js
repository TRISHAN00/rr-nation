import InnerBanner from "@/components/common/InnerBanner";
import Blogs from "@/components/pages/blogs/Blogs";

export default function BlogPage() {
  return (
    <>
      <InnerBanner
        title="Blogs"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
      />
      <Blogs hideBtnArrow />
    </>
  );
}
