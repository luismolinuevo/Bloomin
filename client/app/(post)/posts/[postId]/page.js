"use client";

import React, { useEffect, useState } from "react";
import { getPost } from "@/app/lib/post";
import PostCard from "@/app/components/Post/PostCard";
import { useRouter, useParams } from "next/navigation";
import Comments from "@/app/components/Comment/Comments";

export default function PostId() {
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const postId = params.postId;
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (postId) {
          console.log("Entered");
          const data = await getPost(postId);
          console.log(data);
          if (data.success) {
            setPost(data.post);
          }
        } else {
          console.log("No post Id");
          router.push("/posts");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postId]);
  return (
    <div className="flex justify-center">
      <div className="w-[600px]">
        <PostCard post={post} />
        <Comments/>
      </div>

    </div>
  );
}
