"use client";

import React, { useEffect, useState } from "react";
import AddCommentReply from "./AddCommentReply";
import CommentCard from "./CommentCard";
import { getCommentReplies } from "@/app/lib/commentreply";

export default function CommentReplies({
  token,
  comment_id,
  setRefresh,
  refresh,
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [commentReplys, setCommentReplys] = useState([]);

  const fetchReplies = async () => {
    try {
      const data = await getCommentReplies(comment_id);
      setShowReplies(true);
      console.log(data);
      if (data.success) {
        setCommentReplys(data.comments);
      } else {
        //error toast. Need to install toast
      }
    } catch (error) {
      console.log(
        "There has been a error while fetching comment replies ",
        error
      );
    }
  };

  return (
    <div className="flex gap-3 mx-4">
      {!showReplies ? (
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={fetchReplies}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      ) : (
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => setShowReplies(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )}
      <p></p>
      {showReplies && (
        <div>
          <AddCommentReply token={token} setRefresh={setRefresh} refresh={refresh} comment_id={comment_id}/>
        </div>
      )}
    </div>
  );
}
