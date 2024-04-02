"use client";

import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "../../utils/MaterialTailwind";
import DeletePost from "./DeletePost";

export default function PostMenu({ post, token }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deletePost = async () => {
    try {
      // const delete = await
    } catch (error) {}
  };

  return (
    <div>
      <Menu>
        <MenuHandler>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <button>Edit</button>
          </MenuItem>
          <MenuItem>
          <button onClick={() => setConfirmDelete(!confirmDelete)}>Delete</button>

          </MenuItem>
        </MenuList>
      </Menu>
      {confirmDelete && <DeletePost post_id={post?.id} isVisable={confirmDelete} onClose={() => setConfirmDelete(false)} token={token}/>}
    </div>
  );
}
