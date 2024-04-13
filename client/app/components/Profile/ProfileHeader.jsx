import React from "react";
import { AvatarDefault } from "../General/ProfilePic";
import FollowButton from "./FollowButton";

export default function ProfileHeader({ user, token }) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="pr-5">
          <AvatarDefault src={""} size={"xxl"} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <p className="text-[25px]">{user?.user?.userName}</p>
            <button>EditProfile</button>
            <FollowButton token={token} user_id={user?.user?.id} />
            <p>Setting</p>
          </div>
          <div className="flex gap-4 text-[17px]">
            <p>{user?.postCount} Posts</p>
            <p>{user?.followingCount} Following</p>
            <p>{user?.followerCount} Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
