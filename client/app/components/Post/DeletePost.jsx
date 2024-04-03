"use client";

import React from "react";
import Modal from "../General/Modal";
import { deletePost } from "@/app/lib/post";

export default function DeletePost({ onClose, isVisable, post_id, token }) {
  const handleDelete = async () => {
    try {
      const postdelete = await deletePost(post_id, token);
      if (postdelete.success) {
        //have toast are something
      } else {
      }
      onClose();
    } catch (error) {
      console.log("There ha been a error deleting post");
    }
  };
  
  return (
    <div>
      <Modal onClose={onClose} isVisable={isVisable}>
        <div className="text-center">
          <h1 className="text-[25px]">
            Are you sure you want to delete this post?
          </h1>
          <div className="flex gap-3 justify-center mt-2">
            <button
              onClick={handleDelete}
              className="bg-[#459858] px-4 rounded-lg text-white h-[40px]"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 px-4 rounded-lg text-white h-[40px]"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
