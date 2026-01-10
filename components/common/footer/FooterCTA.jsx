import { NotebookPen } from "lucide-react";
import Image from "next/image";
import FillButton from "../FillButton";

export default function FooterCTA() {
  return (
    <div className=" bg-[#00a19a] py-10 px-16 flex rounded-3xl justify-between items-center overflow-hidden">
      {/* Title */}
      <h2 className=" text-4xl font-semibold text-white">
        Run and Rise Together
      </h2>

      {/* Icon */}
      <div className=" w-14 h-14">
        <Image
          src={"/static/run-icon.svg"}
          alt="run rise"
          width={50}
          height={50}
        />
      </div>

      {/* Registration Button */}
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
  );
}
