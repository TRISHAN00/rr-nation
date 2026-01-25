import InnerBanner from "@/components/common/InnerBanner";
import ShareLinks from "@/components/common/ShareLinks";
import UsefulLinks from "@/components/common/UsefulLinks";
import BlogDetail from "@/components/pages/blogs/BlogDetail";
import RelatedBlogCard from "@/components/pages/blogs/RelatedBlogCard";

export default function BlogDetailPage() {
  return (
    <section>
      <InnerBanner
        title="Blogs"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Blogs", href: "/" }, { label: "ABC" }]}
      />
      <div className=" container mx-auto px-7.5  ">
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-8">
            <BlogDetail />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <ShareLinks />
              <UsefulLinks />
              <RelatedBlogCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
