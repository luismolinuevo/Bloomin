"use client";

import React from "react";
import Modal from "../General/Modal";
import { deletePost } from "@/app/lib/post";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeletePost({
  onClose,
  isVisable,
  post_id,
  token,
  setLoading,
  reload,
}) {
  const handleDelete = async () => {
    try {
      setLoading(true);
      const postdelete = await deletePost(post_id, token);
      if (postdelete.success) {
        toast.success("Deleted post!!!");
        reload();
      } else {
        toast.error("Unable to delete post");
      }

      onClose();
      setLoading(false);
    } catch (error) {
      toast.error("Unable to delete post");
      console.log("There has been a error deleting post");
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
