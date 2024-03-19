"use client";

import React from "react";
import { Select, Option } from "@material-tailwind/react";

export default function SortComments({ refresh, setRefresh, post }) {
  return (
    <div>
      <div className="flex text-[18px] gap-2">
        {/* <p>{comment_count}</p> */}
        <p>{post?.commentCount ? post?.commentCount : 0}</p>
        <p>Comments</p>
      </div>
      {/* <Select></Select> */}
    </div>
  );
}
