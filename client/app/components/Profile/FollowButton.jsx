"use client";

import { button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { follow, unfollow } from "@/app/lib/follower";

//this button could only appear if first its a differnt user,
export default function FollowButton({ token, user_id, userFollowing }) {
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
        <button onClick={unfollowUser}>Unfollow</button>
      ) : (
        <button onClick={followUser}>Follow</button>
      )}
    </div>
  );
}
