import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function UsefulLinks() {
  return (
    <div className="bg-[#E0F7F6] py-10 px-6 sm:px-8 lg:px-10 rounded-xl">
      <h5 className="text-lg font-semibold mb-4 text-black">
        Useful Links
      </h5>

      <ul className="space-y-3">
        <li>
          <Link
            href="#"
            className="flex items-center gap-2 text-black hover:text-brand transition-colors duration-300"
          >
            <LinkIcon size={16} />
            <span>Privacy Policy</span>
          </Link>
        </li>

        <li>
          <Link
            href="#"
            className="flex items-center gap-2 text-black hover:text-brand transition-colors duration-300"
          >
            <LinkIcon size={16} />
            <span>Terms & Conditions</span>
          </Link>
        </li>

        <li>
          <Link
            href="#"
            className="flex items-center gap-2 text-black hover:text-brand transition-colors duration-300"
          >
            <LinkIcon size={16} />
            <span>Refund Policy</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
