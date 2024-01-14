import React from "react";
import Link from "next/link";

export default function Landingpage() {
  return (
    <div className="flex justify-between px-[50px] py-7 md:px-[80px]">
      <div className="w-1/2">
        <h1 className="text-[#65CB6F] text-[75px] font-bold">
          Sustainable Living <br />
          for a <span className="text-[#FCC443]">Brighter</span>
          <br />
          Future
        </h1>
        <div className="flex gap-3 mt-10">
          <Link href={"/signup"} className="bg-[#459858] text-white px-2 py-3 text-[25px] rounded-xl">
            Join Us
          </Link>
          <button className="bg-[#459858] text-white px-2 py-3 text-[25px] rounded-xl">
            Explore Solutions
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <img src="/landingpage.png" alt="" />
      </div>
    </div>
  );
}
