"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Select, Option, Input } from "../../utils/MaterialTailwind";

export default function PostSearch({ page }) {
  const titleStyles = page == "home" ? "text-center text-white" : "";
  const inputStyles = page == "home" ? "bg-white" : "#D9D9D9";
  const subTitleStyles = page == "home" ? "text-white" : "text-black";

  return (
    <div className="px-16 py-20">
      <h1 className={`${titleStyles} text-[40px]`}>Find Sustainable Solutions for Your Home</h1>
      <div>
        <label className={subTitleStyles}>Location</label>
        <Input label="enter city, site, and zipcode" className={inputStyles} />
        <div className="flex gap-20 mt-10">
          <div>
            <label className={subTitleStyles}>Living Situation</label>
            <Select label="-please select-" className="bg-white">
              <Option>TEst</Option>
            </Select>
          </div>
          {/* <div className="flex"> */}
            <div>
              <label className={subTitleStyles}>Type</label>
              <Select label="-please select-" className="bg-white">
                <Option>TEst</Option>
              </Select>
            </div>
          {/* </div> */}
          <div className="flex items-end">
            <button className="bg-[#459858] px-4 rounded-lg text-white h-[40px]">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
