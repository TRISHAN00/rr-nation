import { Star } from "lucide-react";

export default function Rating({ number }) {
  const ratings = new Array(number).fill(0);
  return (
    <div className=" flex gap-0.5">
      {ratings.map((_, index) => (
        <div key={index} className=" bg-[#F39200] h-4 w-4 flex items-center justify-center rounded-[2px] overflow-hidden " >
          <Star size={16} color="#F39200" fill="#fff" />
        </div>
      ))}
    </div>
  );
}
