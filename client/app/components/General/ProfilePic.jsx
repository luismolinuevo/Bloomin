"use client";

import { Avatar } from "@material-tailwind/react";

export function AvatarDefault({ src, size }) {
  return (
    <Avatar
      src={
        src != null ? src : "https://docs.material-tailwind.com/img/face-2.jpg"
      }
      alt="avatar"
      size={size ? size : "md"}
      title="Profile Picture"
    />
  );
}
