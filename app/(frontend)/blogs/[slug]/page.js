import InnerBanner from "@/app/components/common/InnerBanner";
import ShareLinks from "@/app/components/common/ShareLinks";
import UsefulLinks from "@/app/components/common/UsefulLinks";
import BlogDetail from "@/app/components/pages/blogs/BlogDetail";
import RelatedBlogCard from "@/app/components/pages/blogs/RelatedBlogCard";
import { getBlogDetailApi, getBlogListApi } from "../../api/blog-api";

// This function helps with SEO by pulling the specific blog data
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getBlogDetailApi(slug);
  const blog = res?.data?.data;

  return {
    title: `${blog?.title || "Blog"} | RunRise Nation Blog`,
    description: blog?.meta_description || blog?.body?.slice(0, 160),
    openGraph: {
      title: blog?.og_title || blog?.title,
      description: blog?.og_description || blog?.meta_description,
      type: "article",
      publishedTime: blog?.date ? `${blog.date}T00:00:00.000Z` : "2024-01-30T00:00:00.000Z",
      authors: ["RunRise Nation"],
      images: [
        {
          url: res?.data?.images?.list?.[0]?.full_path,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }) {

  const { slug } = await params;
  console.log(slug)
  const [res, listRes] = await Promise.all([
    getBlogDetailApi(slug),
    getBlogListApi(),
  ]);
  const blog = res?.data;
  const banner = blog?.images?.list?.find(image => image?.banner === "on");

  const relatedBlogs = (listRes?.data || [])
    .filter((item) => item?.data?.id !== blog?.data?.id)
    .slice(0, 4);

  return (
    <section>
      <InnerBanner
        title={blog?.data?.title}
        background={banner?.full_path}
        breadcrumbs={[{ label: "Blogs", href: "/blogs" }, { label: blog?.data?.title }]}
      />
      <div className="container mx-auto px-7.5">
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-8">
            <BlogDetail blog={blog} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <ShareLinks
                url={`https://runrisenation.com/blogs/${encodeURIComponent(slug)}`}
                title={blog?.data?.title}
              />
              <UsefulLinks />
              <RelatedBlogCard blogs={relatedBlogs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}