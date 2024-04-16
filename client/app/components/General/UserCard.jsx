import { Avatar } from "@material-tailwind/react";
import React from "react";
import FollowButton from "../Profile/FollowButton";
import Link from "next/link";

//This is the card using in components like following popup, and follower popup
export default function UserCard({ user, token }) {
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent the default behavior of the link
  };
  return (
    <Link href={`/profile/${user?.id}`} className="flex gap-28 items-center">
      <div className="flex gap-2 items-center">
        <Avatar size="md" src={`${user?.imageUrl}`} />
        <h1>{user?.userName}</h1>
      </div>
      <div onClick={handleButtonClick}>
        <FollowButton
          token={token}
          user_id={user?.id}
          userFollowing={user?.isFollowing}
        />
      </div>
    </Link>
  );
}
