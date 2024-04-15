import { Avatar } from "@material-tailwind/react";
import React from "react";
import FollowButton from "../Profile/FollowButton";
import Link from "next/link";

//This is the card using in components like following popup, and follower popup
export default function UserCard(user, token, userFollowing) {
  console.log(user);
  return (
    <Link href={`/profile/${user?.id}`} className="flex gap-28 items-center">
      <div className="flex gap-2 items-center">
        <Avatar size="md" src={`${user?.user?.imageUrl}`} />
        <h1>{user?.user?.userName}</h1>
      </div>
      <FollowButton
        token={token}
        user_id={user?.user?.id}
        userFollowing={userFollowing}
      />
    </Link>
  );
}
