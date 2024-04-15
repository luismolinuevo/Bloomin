import React from "react";
import { AvatarDefault } from "../General/ProfilePic";
import FollowButton from "./FollowButton";
import EditButton from "./EditButton";
import FollowingPopup from "./FollowingPopup";
import FollowersPopup from "./FollowersPopup";

export default function ProfileHeader({ user, token, setLoading }) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="pr-5">
          <AvatarDefault src={user?.user?.imageUrl} size={"xxl"} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <p className="text-[25px]">{user?.user?.userName}</p>
            <EditButton user={user} token={token} setLoading={setLoading} />
            <FollowButton
              token={token}
              user_id={user?.user?.id}
              userFollowing={user?.isFollowing}
              setLoading={setLoading}
            />
            <p>Setting</p>
          </div>
          <div className="flex gap-4 text-[17px]">
            <p>{user?.postCount} Posts</p>
            <FollowingPopup
              followingCount={user?.followingCount}
              setLoading={setLoading}
            />
            <FollowersPopup
              token={token}
              user_id={user?.user?.id}
              followerCount={user?.followerCount}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
