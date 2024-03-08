"use client";

import React, { useEffect, useState } from "react";
import { getPost } from "@/app/lib/post";
import PostCard from "@/app/components/Post/PostCard";

export default function PostId() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPost();
      console.log(data);
      if (data.success) {
        // setPost(data.post);
      }
    };

    fetchPost();
  }, []);
  return <div></div>;
}
