"use client"

import { useState } from "react";
import Modal from "../General/Modal";

export default function CreatePost() {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
        <button onClick={() => setOpenModal(!openModal)}>
            Create a new post
        </button>
        <Modal onClose={() => setOpenModal(false)} isVisable={openModal}>
            <p>Hey</p>
        </Modal>
    </div>
  )
}
