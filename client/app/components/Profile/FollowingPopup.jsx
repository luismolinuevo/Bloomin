"use client";

import React from "react";
import Modal from "../General/Modal";

export default function FollowingPopup() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Modal onClose={() => setOpenModal(false)} isVisable={openModal}>
        <div>
          <input type="text" />
          <div></div>
        </div>
      </Modal>
    </div>
  );
}
