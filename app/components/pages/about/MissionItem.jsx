import MissionList from "./MissionList";

export default function MissionItem({ hideBtn, data }) {
  const overLine = data?.section_data?.overline_text;
  const subtitle = data?.section_data?.subtitle;
  const buttonName = data?.section_data?.banner_button_name;
  const buttonSlug = data?.section_data?.banner_button_slug;
  const points = data?.posts?.list;

  return (
    <div className="max-w-xl">
      {/* Section Label */}
      {overLine && <span className="block text-[16px] font-bold leading-5 text-brand mb-5 uppercase">
        {overLine}
      </span>}


      {/* Title */}
      {subtitle && <h2 className="text-[28px] sm:text-[34px] md:text-[40px] leading-9 sm:leading-10.5 md:leading-12 font-bold text-dark mb-6 sm:mb-8 md:mb-10">
        {subtitle}
      </h2> }
   

      {/* Mission List */}
      <MissionList hideBtn={hideBtn} points={points} buttonName={buttonName} buttonSlug={buttonSlug} />
    </div>
  );
}
