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
  const [loading, setLoading] = useState(false);
  const token = cookie.get("user_token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (postId) {
          const data = await getPost(postId, token);
          if (data.success) {
            setPost(data.post);
          }
        } else {
          console.log("No post Id");
          router.push("/posts");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postId, refresh]);

  return (
    <div className="flex justify-center">
      <div className="">
        <PostCard post={post} token={token} setLoading={setLoading}/>
        <Comments post={post} setRefresh={setRefresh} refresh={refresh} post_id={postId}/>
      </div>
    </div>
  );
}
