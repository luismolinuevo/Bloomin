"use client";

import React, { useState, useEffect } from "react";
import { favoritePost } from "@/app/lib/favorites";

export default function FavoritePostButton({ post, token }) {
  const [faved, setFaved] = useState(post?.userFav || 0); //doing it this way so api doest have to refresh, I would also use web sockets.
  const [favLikes, setFavLikes] = useState(post?.favCount || 0);

  useEffect(() => {
    if (post) {
      setFaved(post?.userFav);
      setFavLikes(post?.favCount);
    }
  }, [post]);

  const handleFavorite = async () => {
    try {
      const data = await favoritePost(post?.id, token);
      console.log(data);
      //true
      if (data.success) {
        if (faved) {
          setFaved(false);
          setFavLikes(favLikes - 1);
        } else {
          setFaved(true);
          setFavLikes(favLikes + 1);
        }
      }
    } catch (error) {
      console.log("There has been a error faving the post ", error);
    }
  };

  if (!post) {
    return null; //need to add loading icon here
  }

  return (
    <div>
      <button
        className={`border p-2 rounded-lg flex items-center gap-1 ${
          faved ? "bg-[#459858]" : "bg-gray-300"
        }`}
        onClick={handleFavorite}
        title="Favorite Post"
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
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
        <p>{favLikes}</p>
      </button>
    </div>
  );
}
