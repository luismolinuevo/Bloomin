import React from "react";
import { useRouter } from "next/navigation";

export default function PostSearch({page}) {
    const titleStyles = page == "home" ? "text-center text-white" : ""
  return (
    <div>
      <h1 className={titleStyles}>Find Sustainable Solutions for Your Home</h1>
      <div>
        <h3></h3>
        <input type="text" />
        <div className="flex">
          <div>
            <h3>Living Situation</h3>
            <select name="" id=""></select>
          </div>
        </div>
        <div className="flex">
          <div>
            <h3>Living Situation</h3>
            <select name="" id=""></select>
          </div>
        </div>
      </div>
    </div>
  );
}
