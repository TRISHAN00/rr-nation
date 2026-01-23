import BlogCard from "./BlogCard";

export default function BlogList() {
  return (
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
  );
}
