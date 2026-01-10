import BannerShapes from "@/components/common/ShapeIcon";
import FooterCTA from "./FooterCTA";

export default function Footer() {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/static/footer-bg.jpg')",
      }}
    >
      <div className=" w-7xl m-auto">
        {/* Medal Icon */}
        <div>
          <BannerShapes type={"medal"} />
        </div>
        
        {/* Footer CTA */}
        <FooterCTA />

        {/* Indicator */}
        <div className=" flex justify-end w-full">
          <BannerShapes type={"indicator"} />
        </div>
        {/* Logo */}
        {/* Footer Item Column */}
        {/* Copyright */}
      </div>
    </div>
  );
}
