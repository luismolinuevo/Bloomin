import React from "react";
import cookie from "js-cookie";
import VotingButtons from "./VotingButtons";
import FavoritePostButton from "./FavoritePostButton";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostCardsButtons({ post, setLoading }) {
  const token = cookie.get("user_token");

  return (
    <div className="flex gap-5 mt-8">
      <VotingButtons
        token={token}
        post={post}
        post_upvotes={post?.post_upvotes}
        setLoading={setLoading}
      />
      <FavoritePostButton post={post} token={token} setLoading={setLoading}/>
      <button className="border p-2 bg-gray-300 rounded-lg flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
        Share
      </button>
      <Link
        href={`/posts/${post?.id}`}
        className="border p-2 bg-gray-300 rounded-lg flex items-center gap-1"
        title="Comments"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
        <p>{post?.commentCount ? post?.commentCount : 0}</p>
      </Link>
    </div>
  );
}
