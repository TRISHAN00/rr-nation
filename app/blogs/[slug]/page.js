// This function helps with SEO by pulling the specific blog data
export async function generateMetadata({ params }) {
  // Fetch your blog data based on params.id or params.slug
  // const blog = await getBlogData(params.slug); 

  return {
    title: `ABC | RunRise Nation Blog`, // Replace "ABC" with blog.title
    description: "Read the latest update from RunRise Nation...", // Replace with blog.excerpt
    openGraph: {
      title: "ABC",
      description: "Read more on RunRise Nation",
      type: "article",
      publishedTime: "2024-01-30T00:00:00.000Z", // Use actual publish date
      authors: ["RunRise Nation"],
      images: [
        {
          url: "/dynamic/about/inner-banner.jpg", // Use the blog's featured image
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function BlogDetailPage() {
  return (
    <section>
      <InnerBanner
        title="Blog Details"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Blogs", href: "/blogs" }, { label: "ABC" }]}
      />
      <div className="container mx-auto px-7.5">
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