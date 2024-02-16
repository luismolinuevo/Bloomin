"use client"

import { getAllPosts } from "@/app/lib/post";
import { useEffect, useState } from "react";

export default function Post() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(!loading);
      const posts = await getAllPosts();
      if(posts.success) {
        setPost(posts.post);
        setLoading(!loading);
      } else {
        //take to error page or something
      }
    }

    fetchPost();
  },[]);

  return (
    <div>

    </div>
  )
}
