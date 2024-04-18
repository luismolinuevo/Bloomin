"use client";

import React from "react";
import { Select, Option, Input } from "@material-tailwind/react";

export default function PostSearch({ page }) {
  const titleStyles = page == "home" ? "text-center text-white" : "";
  const inputStyles = page == "home" ? "bg-white" : "bg-[#D9D9D9] w-[500px]";
  const subTitleStyles = page == "home" ? "text-white" : "text-black";

  console.log("Entered in here");

  return (
    <div className="px-12 md:px-16 py-10 md:py-20">
      <h1 className={`${titleStyles} text-[30px] md:text-[40px]`}>
        Find Sustainable Solutions for Your Home
      </h1>
      <div>
        <label className={subTitleStyles}>Location</label>
        <Input
          placeholder="enter city, site, and zipcode"
          className={inputStyles}
          // className="bg-black"
        />
        <div className="flex flex-col md:flex-row md:justify-normal md:items-end md:gap-20 mt-4">
          <div className="mb-4 md:mb-0">
            <label className={subTitleStyles}>Living Situation</label>
            <Select label="-please select-" className="bg-white">
              <Option>Test</Option>
            </Select>
          </div>
          <div className="mb-4 md:mb-0">
            <label className={subTitleStyles}>Type</label>
            <Select label="-please select-" className="bg-white">
              <Option>Test</Option>
            </Select>
          </div>
          <div>
            <button className="bg-[#459858] px-4 rounded-lg text-white h-[40px]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
