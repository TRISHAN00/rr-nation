import { NotebookPen } from "lucide-react";
import Image from "next/image";
import FillButton from "../FillButton";

export default function FooterCTA() {
  return (
    <div className=" bg-[#00a19a] py-10 px-16 flex rounded-3xl items-center overflow-hidden relative">
      {/* Title */}
      <h2 className=" text-4xl text-left font-semibold z-10 text-white">
        Run and Rise Together
      </h2>

      {/* Icon */}
      <div className=" w-16 h-16 m-auto">
        <Image
          src={"/static/marathon.gif"}
          alt="run rise"
          width={80}
          height={80}
        />
      </div>

      {/* Registration Button */}
      <div className=" ml-auto" >
      <FillButton
        icon={NotebookPen}
        bgColor="#fafafa "
        hoverBg="#001819"
        textColor="#00a19a"
        hoverText="#fafafa"
        iconPosition="right"
      >
        Registration
      </FillButton>
      </div>

      <div className=" absolute left-0 bottom-0  ">
        <Image
          src={"/static/shine-shape.svg"}
          alt="run rise"
          width={340}
          height={125}
        />
      </div>
    </div>
  );
}
