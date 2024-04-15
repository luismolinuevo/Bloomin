"use client";

import React, { useState } from "react";
import Modal from "../General/Modal";
import FollowButton from "./FollowButton";
import UserCard from "../General/UserCard";

export default function FollowingPopup({ followingCount }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button onClick={() => setOpenModal(!openModal)}>
        {followingCount} Following
      </button>
      <Modal onClose={() => setOpenModal(false)} isVisable={openModal}>
        <div>
          <input type="text" />
          <UserCard />
        </div>
      </Modal>
    </div>
  );
}
