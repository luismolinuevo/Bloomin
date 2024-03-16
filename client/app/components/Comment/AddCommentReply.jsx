"use client";

import React, { useState } from "react";
import { createComment } from "@/app/lib/commentreply";
import { Input } from "@material-tailwind/react";

export default function AddCommentReply({
  post_id,
  token,
  setRefresh,
  refresh,
}) {
  const [textbody, setTextBody] = useState("");

  const onClick = async () => {
    try {
      const data = {
        textbody: textbody,
      };

      const create = createComment(post_id, data, token);
      if (create.success) {
        //success alert or something. need to figure out what im going to do
        setRefresh(!refresh);
        console.log("Success creating comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex gap-4 justify-between mt-5">
        <Input
          type="text"
          variant="standard"
          label="Add comment"
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
