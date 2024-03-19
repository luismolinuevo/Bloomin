"use client";

import React, { useState } from "react";
import { favoritePost } from "@/app/lib/favorites";
import { useAppSelector } from "@/app/store/reduxhooks";

export default function FavoritePostButton({ post, token }) {
  const [faved, setFaved] = useState(post?.userFav); //doing it this way so api doest have to refresh, I would also use web sockets.
  const handleFavorite = async () => {
    const data = await favoritePost(post?.id, token);
    console.log(data);
    setFaved(!faved);
  };

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
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
        <p>{post?.favCount}</p>
      </button>
    </div>
  );
}
