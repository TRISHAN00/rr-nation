import Image from "next/image";

export default function AwardWin() {
  return (
     <div className="relative flex items-start">
          {/* Decorative Shape */}
          <Image
            src="/static/about-shape.svg"
            width={30}
            height={400}
            alt="Run Rise Nation shape"
          />

          {/* Aspect Ratio Container */}
          <div className="relative h-[636] w-[470] rounded-4xl overflow-hidden ml-10 ">
            <Image
              src="/dynamic/about/about-us.jpg"
              alt="Run Rise About and Mission"
              width={470}
              height={636}
              className="object-cover"
            />

            <div className=" w-52 h-52 bg-[#00a19a] absolute bottom-0 left-0 rounded-tr-[200px] "></div>
          </div>
          <div className=" bg-[#263D42] border-[#E8E8E8] border absolute bottom-25 left-0 w-72 h-28 flex items-center justify-center text-[18px] text-[#F3E4C8] font-medium gap-5 rounded-sm ">
            <Image
              src="/static/award-wining.svg"
              alt="Run Rise Award Wining Badge"
              width={54}
              height={43}
              className="object-cover"
            />{" "}
            <span>AWARD WINING</span>
          </div>
        </div>
  )
}
