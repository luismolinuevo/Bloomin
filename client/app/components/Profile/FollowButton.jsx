"use client";

import { button } from "@material-tailwind/react";
import React, { useState } from "react";

//this button could only appear if first its a differnt user,
export default function FollowButton({ isFollowing }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const followUser = async () => {};

  const unfollowUser = async () => {};

  return (
    <div>
      {isFollowing ? <button>Unfollow</button> : <button>Follow</button>}
    </div>
  );
}
