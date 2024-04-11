import React from "react";
import { AvatarDefault } from "../General/ProfilePic";

export default function ProfileHeader({ user }) {
  return (
    <div>
      <div className="flex">
        <div className="pr-5">
          <AvatarDefault src={""} size={"xxl"} />
        </div>
        <div className="flex gap-4">
          <p>Username</p>
          <button>EditProfile</button>
          <p>Setting</p>
        </div>
        <div className="flex gap-4">
          <p>10 Posts</p>
          <p>1000 Following</p>
          <p>1000 Followers</p>
        </div>
      </div>
    </div>
  );
}
