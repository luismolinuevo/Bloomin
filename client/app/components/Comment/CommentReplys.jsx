"use client";

import React, { useState } from "react";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";

export default function CommentReplys({
  token,
  comment_id,
  setRefresh,
  refresh,
}) {
  const [wantToReply, setWantToReply] = useState(false);
  const [commentReplys, setCommentReplys] = useState([]);

  const fetchReplys = async () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="flex gap-3 mx-4">
      {!wantToReply ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={() => setWantToReply(!wantToReply)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={() => setWantToReply(!wantToReply)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      )}
      <p></p>
      <div>{/* <AddComment /> */}</div>
    </div>
  );
}
