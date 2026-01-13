import HeaderSocial from "@/components/common/header/HeaderSocial";

export default function FollowUs() {
  return (
    <div className="mr-4 md:mr-8 xl:mr-10 2xl:mr-10 flex flex-col items-center justify-center">
      <HeaderSocial direction="column" />

      <div className="h-10 w-[1px] bg-white my-3.5" />

      <h5 className="uppercase text-md font-semibold [writing-mode:vertical-rl] rotate-180">
        Follow Us
      </h5>
    </div>
  );
}
