"use client"

import { Avatar } from "@material-tailwind/react";
 
export function AvatarDefault({src}) {
  return <Avatar src={src} alt="avatar" size="md" title="Profile Picture"/>;
}