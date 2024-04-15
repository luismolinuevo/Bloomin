import { Avatar } from "@material-tailwind/react";
import React from "react";
import FollowButton from "../Profile/FollowButton";

//This is the card using in components like following popup, and follower popup
export default function UserCard(user) {
  return (
    <div className="flex gap-28 items-center">
      <div className="flex gap-2 items-center">
        <Avatar />
        <h1>Username</h1>
      </div>
      <FollowButton />
    </div>
  );
}
