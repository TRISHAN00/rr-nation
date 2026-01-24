import HeaderSocial from "@/components/common/header/HeaderSocial";
import Image from "next/image";

export default function EventInfoCard() {
  return (
    <div className="bg-[#E6FAF8] rounded-3xl p-6 sm:p-8 w-full space-y-6">
      {/* Event Name */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Event:</p>
        <p className="font-semibold text-dark text-lg">
          Accounting Day Run 2025
        </p>
      </div>

      {/* Location & Date/Time */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Location & Date:</p>
        <p className="font-semibold text-dark">
          Hatirjheel, Dhaka <br />7 Nov, 2025 | 5:30 AM - 10:00 AM
        </p>
      </div>

      <ul className="space-y-4">
        {/* Starting Date */}
        <li>
          <p className="text-sm text-gray-500 mb-1">Starting Date :</p>
          <p className="font-semibold text-dark">02 January, 2024</p>
        </li>

        {/* Ending Date */}
        <li>
          <p className="text-sm text-gray-500 mb-1">Ending Date :</p>
          <p className="font-semibold text-dark">05 June, 2024</p>
        </li>

        {/* Event Status */}
        <li>
          <p className="text-sm text-gray-500 mb-1">Event Status:</p>
          <p className="font-semibold text-dark">Ended</p>
        </li>

        {/* Event Organizer */}
        <li>
          <p className="text-sm text-gray-500 mb-1">Organizer:</p>
          <p className="font-semibold text-dark">
            Dhaka Regional Committee - ICAB
          </p>
        </li>
      </ul>

      {/* Payment Methods */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-1">Payment Methods:</p>
        <div className="flex gap-2">
          <Image
            src={"/static/all-pgw.jpg"}
            height={50}
            width={250}
            alt="payment gateway"
          />
        </div>
      </div>

      {/* Social Sharing */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-1">Share on Socials:</p>
        <div className="flex gap-2">
          <HeaderSocial bgColor="#00A19A" size={36} gap={2} />
        </div>
      </div>
    </div>
  );
}
