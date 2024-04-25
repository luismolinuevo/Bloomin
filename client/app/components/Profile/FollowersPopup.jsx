"use client";

import React, { useEffect, useState } from "react";
import Modal from "../General/Modal";
import { getAllUserFollowers } from "@/app/lib/follower";
import UserCard from "../General/UserCard";

//Followers popup that opens when user clicks on follower count
export default function FollowersPopup({
  token,
  user_id,
  followerCount,
  setLoading,
}) {
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    //could also make it so that it opens when the popup first opens. Also have pagination(for time purposes i dont but I have in other files)
    const getFollowers = async () => {
      try {
        console.log("Entered");
        if (user_id) {
          setLoading(true);
          const data = await getAllUserFollowers(token, user_id, search);
          if (data.success) {
            setFollowers(data.followers);
            setLoading(false);
          } else {
            console.log("Unable to fetch followers");
          }
        } else {
          console.log("No valid user id");
        }
      } catch (error) {
        console.error("There has been a error getting user followers", error);
      }
    };

    getFollowers();
  }, [user_id, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <button onClick={() => setOpenModal(!openModal)}>
        {followerCount} Followers
      </button>
      <Modal
        onClose={() => setOpenModal(false)}
        isVisable={openModal && followers.length != 0}
      >
        <div className="flex flex-col">
          <h1 className="text-center text-[40px] font-bold">Followers</h1>
          <input
            type="text"
            placeholder="Search by username"
            onChange={handleSearchChange}
            className=""
          />
          {followers && followers.length != 0
            ? followers.map((user, index) => (
                <UserCard token={token} user={user} key={index} />
              ))
            : "No followers"}
        </div>
      </Modal>
    </div>
  );
}
