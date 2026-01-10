import Image from "next/image";

export default function BannerShapes({ type }) {
  let shape;

  switch (type) {
    case "corner":
      shape = (
        <Image
          src="/static/corner-shape.svg"
          alt="Corner Shape"
          width={224}
          height={288}
          className="absolute top-0 left-0 z-10"
        />
      );
      break;

    case "wave":
      shape = (
        <Image
          src="/static/wave-shape.svg"
          alt="Wave Shape"
          width={655}
          height={288}
          className="absolute bottom-0 right-0 z-10"
        />
      );
      break;

    case "medal":
      shape = (
        <Image
          src={"/static/medal.svg"}
          alt="run rise medal"
          width={80}
          height={126}
        />
      );
      break;

    case "indicator":
      shape = (
        <Image
          src={"/static/arrow-shape.svg"}
          alt="run rise medal"
          width={93}
          height={110}
        />
      );
      break;

    default:
      shape = null;
  }

  return <>{shape}</>;
}
