import React from "react";
import { AvatarDefault } from "../General/ProfilePic";

export default function ProfileHeader({ user }) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="pr-5">
          <AvatarDefault src={""} size={"xxl"} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <p className="text-[25px]">Username</p>
            <button>EditProfile</button>
            <p>Setting</p>
          </div>
          <div className="flex gap-4 text-[17px]">
            <p>10 Posts</p>
            <p>1000 Following</p>
            <p>1000 Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
