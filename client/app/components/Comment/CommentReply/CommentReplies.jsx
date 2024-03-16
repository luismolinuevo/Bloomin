"use client";

import React, { useEffect, useState } from "react";
import AddCommentReply from "./AddCommentReply";
import CommentCard from "../CommentCard";
import { getCommentReplies } from "@/app/lib/commentreply";

export default function CommentReplies({
  token,
  comment_id,
  setRefresh,
  refresh,
  wantToReply,
  setWantToReply,
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [comments, setComments] = useState([]);
  const [refreshReplies, setRefreshReplies] = useState(false);

  const fetchReplies = async () => {
    try {
      const data = await getCommentReplies(comment_id);
      setShowReplies(true);
      console.log(data);
      if (data?.success) {
        setComments(data?.comments);
        setRefresh(!refresh);
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

  useEffect(() => {
    if (refreshReplies) {
      fetchReplies();
      setRefreshReplies(false); // Reset the refresh flag after fetching
    }
  }, [refreshReplies]); // Trigger the effect when refreshReplies changes

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
        <div className="w-full">
          <div className="mb-5">
            <AddCommentReply
              token={token}
              setRefresh={setRefreshReplies}
              refresh={refreshReplies}
              comment_id={comment_id}
            />
          </div>

          {comments && comments.length != 0 ? (
            <div>
              {comments.map((comment) => (
                // Render each comment here
                <CommentCard
                  key={comment?.id}
                  comment={comment}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  token={token}
                  isReply={true}
                />
              ))}
            </div>
          ) : (
            <p>No comments</p>
          )}
        </div>
      )}
    </div>
  );
}
