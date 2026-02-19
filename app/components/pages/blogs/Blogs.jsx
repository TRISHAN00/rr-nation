"use client";
import Title from "@/app/components/common/Title";
import { useState } from "react";
import "swiper/css";
import BlogCard from "./BlogCard";

const blogPosts = [
  {
    id: 1,
    title: "What is Virtual Run? How to Record and Submit? by A R Khan Bappy",
    author: "A R Khan Bappy",
    description:
      "আপনি কি দৌড়াতে ভালোবাসেন কিন্তু নির্দিষ্ট স্থানে বা সময়ে যোগ দিতে পারেন না? ভার্চুয়াল দৌড়...",
    image: "/dynamic/blogs/1.jpg",
    category: "Virtual",
  },
  {
    id: 2,
    title: "How and When to run in Ramadan? by Tanzil H Rafi",
    author: "Tanzil H Rafi",
    description:
      "রমজানে কিভাবে দৌড়াবেন? রমজানে নিয়মিত দৌড়ানো ও ট্রেনিং চালিয়ে যাওয়া চ্যালেঞ্জিং, তাই নির্দ...",
    image: "/dynamic/blogs/2.jpg",
    category: "Tips",
  },
  {
    id: 3,
    title: "Recovery Run or Easy Run by Minhajul Islam Antor",
    author: "Minhajul Islam Antor",
    description:
      "রিকভারি রান বনাম ইজি রান: কোনটি করবেন ম্যারাথনের পর? ম্যারাথন বা হাফ ম্যারাথনের পর শরীর ও প...",
    image: "/dynamic/blogs/3.png",
    category: "Training",
  },
  {
    id: 4,
    title: "Running Plan during Summer Season by Minhajul Islam Antor",
    author: "Minhajul Islam Antor",
    description:
      "একটা পুরনো প্রবাদ আছে— ‘যখন সমুদ্রে ঝড় ওঠে বা অফসিজন চলে, ফিশারম্যান তখন বসে থাকে না। তারা...",
    image: "/dynamic/blogs/4.jpg",
    category: "Plan",
  },
  {
    id: 5,
    title: "পেসিং এর ক খ by Shovum Sofa",
    author: "Shovum Sofa",
    description:
      "পেসিং এর ক খ নিয়ে লিখবো বহু দিনের মনের ইচ্ছে ছিলো কিন্তু সব কিছু মিলিয়ে হয়ে উঠছিলো না, আর সামনে আর...",
    image: "/dynamic/blogs/5.jpg",
    category: "Training",
  },
];

export default function Blogs({ hideBtnArrow }) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <section className=" py-20 lg:py-30 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div className=" mb-10">
          <Title
            label="Our Services"
            title="Latest Training Tips & Community Stories"
            onPrev={() => swiperInstance?.slidePrev()}
            onNext={() => swiperInstance?.slideNext()}
            isBeginning={isBeginning}
            isEnd={isEnd}
            className="mb-10"
            bgColor={"#E0F7F6"}
            hideBtnArrow
          />
        </div>
        <div className="grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
