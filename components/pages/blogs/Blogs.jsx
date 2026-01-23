import Title from "@/components/common/Title";
import BlogFeaturedSlide from "./BlogFeaturedSlide";

export default function Blogs() {
  return (
    <section className=" py-20 lg:py-30 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <Title />
        <BlogFeaturedSlide />
      </div>
    </section>
  );
}
