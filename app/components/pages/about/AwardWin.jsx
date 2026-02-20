import Image from "next/image";

export default function AwardWin({ hideShape, hideRound, hideTopImage }) {
  return (
    <div className="relative flex items-start">
      {/* Decorative Shape */}

      <div className=" hidden md:flex">
        <Image
          src="/static/about-shape.svg"
          width={30}
          height={400}
          alt="Run Rise Nation shape"
        />
      </div>

      <div className="relative w-full max-w-[470] h-[360] sm:h-[480] md:h-[636] rounded-4xl overflow-hidden md:ml-10">
        <Image
          src="/dynamic/about/Vision-Photo_Award_Winning.jpg"
          alt="Run Rise About and Mission"
          fill
          className="object-fill h-full w-full "
        />

        {!hideRound && (
          <div className=" w-52 h-52 bg-brand absolute bottom-0 left-0 rounded-tr-[200px] hidden md:flex lg:flex "></div>
        )}
      </div>

      {!hideShape && (
        <div className=" bg-[#263D42] border-[#E8E8E8] border absolute bottom-25 left-0 w-72 h-28 items-center justify-center text-[18px] text-[#F3E4C8] font-medium gap-5 rounded-sm hidden md:flex lg:flex ">
          <Image
            src="/static/award-wining.svg"
            alt="Run Rise Award Wining Badge"
            width={54}
            height={43}
            className="object-cover"
          />{" "}
          <span className=" uppercase" >Award Winning</span>
        </div>
      )}

      {!hideTopImage && (
        <div className=" absolute -bottom-20 right-0 rounded-4xl hidden md:flex lg:flex overflow-hidden">
          <Image
            src="/dynamic/about/about-us-dd.jpg"
            alt="Run Rise About and Mission"
            width={350}
            height={350}
            className="object-fill h-full w-full "
          />
        </div>
      )}
    </div>
  );
}
