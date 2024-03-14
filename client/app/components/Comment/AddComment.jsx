import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { createComment } from "@/app/lib/comments";


export default function AddComment({ post_id, token }) {
  
  const onClick = async () => {
    try {
      const create = createComment(post_id, token);
      if(create.success) {
        //success alert or something. need to figure out what im going to do
      }
    } catch(error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex gap-4 justify-between mt-10">
        <input
          type="text"
          className="border-black border w-[70%] rounded-lg p-2 "
          placeholder="Add comment"
        />
        <button className="bg-[#459858] px-4 rounded-lg text-white h-[40px]" onClick={onClick}>
          Add Comments
        </button>
      </div>
    </div>
  );
}
