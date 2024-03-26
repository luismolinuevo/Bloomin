"use client";

import { votePost } from "@/app/lib/post";
import { useState, useEffect } from "react";

export default function VotingButtons({ post, token }) {
  const [liked, setLiked] = useState(post?.userLike || null);
  const [postLikes, setPostLikes] = useState(post?.likeCount || 0);

  useEffect(() => {
    if (post) {
      setLiked(post.userLike);
      setPostLikes(post.likeCount);
    }
  }, [post]);

  const vote = async (type) => {
    try {
      const voting = await votePost(post?.id, token, type);
      if (voting.success) {
        if (type === "like") {
          setLiked("like");
          setPostLikes(postLikes + 1);
        } else if (type === "dislike") {
          setLiked("dislike");
          setPostLikes(postLikes - 1);
        }
      }
    } catch (error) {
      console.log("Voting not working ", error);
    }
  };

  if (!post) {
    return null; //need to add loading icon here
  }

  return (
    <div
      className={`border p-2 bg-gray-300 rounded-lg flex items-center gap-2`}
    >
      <div>
        <button
          onClick={() => vote("like")}
          title="Like"
          className={`flex gap-1 `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${
              liked === "like" ? "text-green-500" : "text-black"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
          <p>{postLikes}</p>
        </button>
        {/* <p>{post_upvotes && post_upvotes}</p> */}
      </div>
      <p className="border border-[#459858] h-full"></p>
      <button onClick={() => vote("dislike")} title="Dislike">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-6 h-6 ${
            liked === "dislike" ? "text-green-500" : "text-black"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </button>
    </div>
  );
}
