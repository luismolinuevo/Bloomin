import React from "react";
import Link from "next/link";

export default function Landingpage() {
  return (
    <div className="flex justify-between px-[50px] py-7 md:px-[80px]">
      <div className="w-full md:w-1/2">
        <h1 className="text-[#65CB6F] text-[40px] sm:text-[75px] font-bold">
          Sustainable Living <br />
          for a <span className="text-[#FCC443]">Brighter</span>
          <br />
          Future
        </h1>
        <div className="flex gap-3 mt-10">
          <Link
            href={"/signup"}
            className="bg-[#459858] text-white px-2 py-3 text-[15px] md:text-[25px] rounded-xl text-center"
          >
            Join Us
          </Link>
          <button className="bg-[#459858] text-white px-2 py-3 text-[15px] md:text-[25px] rounded-xl text-center">
            Explore Solutions
          </button>
        </div>
      </div>
      <div className="w-1/2 z-[-1]">
        <img src="/landingpage.png" alt="" className="hidden md:block z-[0]" />
      </div>
    </div>
  );
}
