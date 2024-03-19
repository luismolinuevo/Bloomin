"use client";

import React, { useState } from "react";
import { createCommentReply } from "@/app/lib/commentreply";
import { Input } from "@material-tailwind/react";

export default function AddCommentReply({
  comment,
  token,
  setRefresh,
  refresh,
}) {
  const [textbody, setTextBody] = useState("");
  console.log(comment)

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      await onClick(); // Call the onClick function
    }
  };

  const onClick = async () => {
    try {
      const data = {
        textbody: textbody,
        postId: comment?.postId,
      };

      const create = await createCommentReply(comment?.id, data, token);
      console.log(create);
      if (create.success) {
        // Success alert or something. Need to figure out what I'm going to do
        setRefresh(!refresh);
        setTextBody("");
        console.log("Success creating comment reply");
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
          className=""
          placeholder="Add comment"
          onChange={(e) => setTextBody(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
