import HeaderSocial from "@/components/common/header/HeaderSocial";

export default function FollowUs() {
  return (
    <div className="w-11 h-80 mr-10 flex flex-col items-center justify-center">
      <HeaderSocial direction="column" />

      <div className="h-10 w-[1px] bg-white my-3.5" />

      <h5
        className="
              uppercase text-md font-semibold
              [writing-mode:vertical-rl]
              rotate-180
            "
      >
        Follow Us
      </h5>
    </div>
  );
}
