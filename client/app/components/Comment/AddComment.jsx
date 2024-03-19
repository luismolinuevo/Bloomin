"use client";

import React, { useState } from "react";
import { createComment } from "@/app/lib/comments";

export default function AddComment({ post_id, token, setRefresh, refresh }) {
  const [textbody, setTextBody] = useState("");

  const onClick = async () => {
    try {
      const data = {
        textbody: textbody,
      };

      const create = await createComment(post_id, data, token);
      if (create.success) {
        setRefresh(!refresh);
        setTextBody("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex gap-4 justify-between mt-5">
        <input
          type="text"
          className="border bg-grey-1 w-[70%] rounded-lg p-2 "
          placeholder="Add comment"
          onChange={(e) => setTextBody(e.target.value)}
        />
        <button
          className="bg-[#459858] px-3 rounded-lg text-white h-[40px] text-[15px]"
          onClick={onClick}
        >
          Add Comments
        </button>
      </div>
    </div>
  );
}
