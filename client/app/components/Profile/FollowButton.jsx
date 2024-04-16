"use client";

import { button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { follow, unfollow } from "@/app/lib/follower";

//this button could only appear if first its a differnt user,
export default function FollowButton({ token, user_id, userFollowing, setLoading }) {
  const [isFollowing, setIsFollowing] = useState(userFollowing || false);

  useEffect(() => {
    if (user_id) {
      setIsFollowing(userFollowing);
    }
  }, [user_id, userFollowing]);

  const followUser = async () => {
    try {
      const data = {
        followingId: user_id,
      };

      console.log("IM here");
      const request = await follow(data, token);

      if (request.success) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("There has been a error with following a user", error);
    }
  };

  const unfollowUser = async () => {
    try {
      console.log(user_id)
      const request = await unfollow(user_id, token);

      if (request.success) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("There has been a error with unfollowing a user", error);
    }
  };

  return (
    <div>
      {isFollowing ? (
        <button className="bg-red-600 text-[15px] px-2 sm:px-4 rounded-lg text-white h-[40px]" onClick={unfollowUser}>Unfollow</button>
      ) : (
        <button className="bg-[#459858] px-4 rounded-lg text-white h-[40px]" onClick={followUser}>Follow</button>
      )}
    </div>
  );
}
