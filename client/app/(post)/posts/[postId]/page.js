"use client";

import React, { useEffect, useState } from "react";
import { getPost } from "@/app/lib/post";
import PostCard from "@/app/components/Post/PostCard";
import { useRouter, useParams } from "next/navigation";
import Comments from "@/app/components/Comment/Comments";
import { useAppSelector } from "@/app/store/reduxhooks";
import cookie from "js-cookie"

export default function PostId() {
  const router = useRouter();
  const params = useParams();
  const userId = useAppSelector((state) => state.auth.userData);
  console.log(userId);
  const postId = params.postId;
  const [post, setPost] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token = cookie.get("user_token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (postId) {
          console.log("Entered");
          const data = await getPost(postId, token);
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
  }, [postId, refresh]);

  return (
    <div className="flex justify-center">
      <div className="w-[800px]">
        <PostCard post={post} />
        <Comments post={post} setRefresh={setRefresh} refresh={refresh} post_id={postId}/>
      </div>
    </div>
  );
}
