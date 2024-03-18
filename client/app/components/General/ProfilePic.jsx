"use client";

import { Avatar } from "@material-tailwind/react";

export function AvatarDefault({ src }) {
  return (
    <Avatar
      src={src ? src : "https://docs.material-tailwind.com/img/face-2.jpg"}
      alt="avatar"
      size="md"
      title="Profile Picture"
    />
  );
}
