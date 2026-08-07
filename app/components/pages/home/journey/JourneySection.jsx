import JourneyArrow from "./JourneyArrow";
import JourneyItem from "./JourneyItem";
import JourneyShapeBg from "./JourneyShapeBg";

export default function JourneySection({ data }) {
  const overLine = data?.section_data?.overline_text;
  const subtitle = data?.section_data?.subtitle;
  const journeyList = data?.posts?.list || [];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Decorative background */}
      <JourneyShapeBg />

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="relative z-10 mb-10 text-center lg:mb-20">
          {overLine && (
            <span className="text-brand text-sm font-bold uppercase tracking-wide">
              {overLine}
            </span>
          )}

          {subtitle && (
            <h2 className="text-dark mt-4 text-3xl font-bold md:text-4xl">
              {subtitle}
            </h2>
          )}
        </div>

        {/* Journey Row */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-14 lg:flex-row lg:gap-10">
          {journeyList.map((item, index) => {
            const post = item?.data || item;

            const title = post?.title || "";
            const text =
              post?.short_desc ||
              post?.description ||
              post?.excerpt ||
              "";

            const image =
              item?.images?.list?.[0]?.full_path ||
              item?.images?.[0]?.full_path ||
              post?.image ||
              "";

            return (
              <div
                key={post?.id || index}
                className="flex flex-col items-center lg:flex-row"
              >
                <JourneyItem
                  title={title}
                  text={text}
                  icon={image}
                />

                {/* Don't show arrow after the last item */}
                {index < journeyList.length - 1 && <JourneyArrow />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}