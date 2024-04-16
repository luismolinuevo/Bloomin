"use client";

import React, { useState, useEffect } from "react";
import Modal from "../General/Modal";
import FollowButton from "./FollowButton";
import UserCard from "../General/UserCard";
import { getAllUserFollowing } from "@/app/lib/follower";

//Following up that opens when a user clicks user following count
export default function FollowingPopup({
  token,
  user_id,
  followingCount,
  setLoading,
}) {
  const [search, setSearch] = useState("");
  const [following, setFollowing] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    //could also make it so that it opens when the popup first opens. Also have pagination(for time purposes i dont but I have in other files)
    const getFollowing = async () => {
      try {
        if (user_id) {
          setLoading(true);
          const data = await getAllUserFollowing(token, user_id, search);
          if (data.success) {
            setFollowing(data.following);
            setLoading(false);
          } else {
            console.log("Unable to fetch following");
          }
        } else {
          console.log("No valid user id");
        }
      } catch (error) {
        console.error("There has been a error getting user following", error);
      }
    };

    getFollowing();
  }, [user_id, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <button onClick={() => setOpenModal(!openModal)}>
        {followingCount} Following
      </button>

      <Modal
        onClose={() => setOpenModal(false)}
        isVisable={openModal && following && following.length != 0}
      >
        <div>
          <input
            type="text"
            placeholder="Search by username"
            onChange={handleSearchChange}
          />
          {following && following.length != 0
            ? following.map((user) => <UserCard token={token} user={user} />)
            : "No following"}
        </div>
      </Modal>
    </div>
  );
}
