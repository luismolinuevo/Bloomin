"use client";

import React from "react";

export default function SortComments({ refresh, setRefresh, post }) {
  return (
    <div>
      <div className="flex md:text-[18px] gap-2">

        <p>{post?.commentCount ? post?.commentCount : 0}</p>
        <p>Comments</p>
      </div>
    </div>
  );
}
