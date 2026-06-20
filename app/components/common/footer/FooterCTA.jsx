"use client";

import { useAuthContext } from "@/context/AuthContext";
import { getGlobalData } from "@/services/global.service";
import { NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FillButton from "../FillButton";

export default function FooterCTA() {
  const { isAuthenticated } = useAuthContext();
  const [global, setGlobal] = useState({});

  const fetchGlobal = async () => {
    try {
      if (!isAuthenticated) return;
      const res = await getGlobalData();
      setGlobal(res?.data?.data || {});
    } catch (err) {
      console.error("Failed to load global data", err);
    }
  };

  useEffect(() => {
    fetchGlobal();
  }, [isAuthenticated]);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-brand px-6 py-10 sm:px-10 sm:py-10 lg:px-16 flex flex-col gap-6
        md:flex-row md:items-center`}
    >
      {/* Title */}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-white text-center md:text-left z-10`}
      >
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
      <div className="flex flex-col sm:flex-row items-center justify-center md:ml-auto z-10 gap-3">
        <Link href={"/events"}>
          <FillButton
            icon={NotebookPen}
            bgColor="#fafafa"
            hoverBg="#001819"
            textColor="#00a19a"
            hoverText="#fafafa"
            iconPosition="right"
          >
            Get Ticket
          </FillButton>
        </Link>
        {!global?.isMember && (
          <Link href="/member-register">
            <FillButton
              bgColor="transparent"
              hoverBg="#fafafa"
              textColor="#fafafa"
              hoverText="#00a19a"
            >
              Become a Member
            </FillButton>
          </Link>
        )}
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
