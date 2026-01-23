import BlogCard from "./BlogCard";

export default function Blogs() {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div>
          
        </div>
        <div
          className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-5 
        sm:gap-6 
        lg:gap-7.5
      "
        >
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>
  );
}
