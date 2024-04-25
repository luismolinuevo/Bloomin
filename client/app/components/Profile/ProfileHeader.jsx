import React, { useState, useEffect } from "react";
import { AvatarDefault } from "../General/ProfilePic";
import FollowButton from "./FollowButton";
import EditButton from "./EditButton";
import FollowingPopup from "./FollowingPopup";
import FollowersPopup from "./FollowersPopup";
import { useAppSelector } from "@/app/store/reduxhooks";

//Profile header in user profile(part that shows the user information)
export default function ProfileHeader({ user, token, setLoading, reload }) {
  const userData = useAppSelector((state) => state.auth.userData);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1064);
    };

    // Set initial state
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up by removing event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <div className="flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <AvatarDefault src={user?.user?.imageUrl} size={"xl"} />
            <div className="ml-4">
              <p className="text-lg font-semibold break-words">{user?.user?.userName}</p>
              {userData?.id === user?.user?.id ? (
                <div className="flex mt-2">
                  <EditButton
                    user={user}
                    token={token}
                    setLoading={setLoading}
                  />
                  <button className="ml-4 px-4 py-2 rounded border border-green-600 text-green-600 hover:bg-green-100 transition-colors">
                    Setting
                  </button>
                </div>
              ) : (
                <FollowButton
                  token={token}
                  user_id={user?.user?.id}
                  userFollowing={user?.isFollowing}
                  setLoading={setLoading}
                />
              )}
            </div>
          </div>
          <div className="flex justify-center gap-4 w-full mb-4">
            <p className="text-lg font-semibold">{user?.postCount} Posts</p>
            <div className="flex gap-4">
              <FollowingPopup
                token={token}
                user_id={user?.user?.id}
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
      ) : (
        <div className="flex justify-center items-center">
          <div className="pr-3 sm:pr-5">
            <AvatarDefault src={user?.user?.imageUrl} size={"xl"} />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-3 sm:gap-4">
              <p className="text-[23px] sm:text-[25px]  ">
                {user?.user?.userName}
              </p>
              {userData?.id == user?.user?.id ? (
                <>
                  <EditButton
                    user={user}
                    token={token}
                    setLoading={setLoading}
                    reload={reload}
                  />
                  <button className="border border-[#459858] px-4 rounded-lg text-[#459858] h-[40px]">
                    Setting
                  </button>
                </>
              ) : (
                <FollowButton
                  token={token}
                  user_id={user?.user?.id}
                  userFollowing={user?.isFollowing}
                  setLoading={setLoading}
                />
              )}
            </div>
            <div className="sm:flex gap-3 sm:gap-4 sm:text-[17px]">
              <p className="w-[70px] sm:w-[85px]">{user?.postCount} Posts</p>

              <FollowingPopup
                token={token}
                user_id={user?.user?.id}
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
      )}
    </div>
  );
}
