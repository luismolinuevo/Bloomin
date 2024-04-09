"use client";

import React from "react";
import Modal from "../../General/Modal";
import { deleteCommentReply } from "@/app/lib/commentreply";

export default function DeleteCommentReply({
  onClose,
  isVisable,
  comment_id,
  token,
  setRefresh,
  refresh,
}) {
  const handleDelete = async () => {
    try {
      const commentdelete = await deleteCommentReply(comment_id, token);
      console.log(commentdelete);
      if (commentdelete.success) {
        setRefresh(!refresh);
      }
      onClose();
    } catch (error) {
      console.log("There has been a error deleting post");
    }
  };

  return (
    <div>
      <Modal onClose={onClose} isVisable={isVisable}>
        <div className="text-center">
          <h1 className="text-[25px]">
            Are you sure you want to delete this comment?
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
