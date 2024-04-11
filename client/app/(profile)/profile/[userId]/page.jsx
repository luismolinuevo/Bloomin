"use client";

import ProfileHeader from "@/app/components/Profile/ProfileHeader";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAllUserPosts } from "@/app/lib/post";
import cookie from "js-cookie";
import PostCard from "@/app/components/Post/PostCard";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [allPostsFetched, setAllPostsFetched] = useState(false);
  const sentinelRef = useRef(null);
  const token = cookie.get("user_token");
  const userId = params.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getAllUserPosts(
          token,
          lastPostId,
          "",
          "userfavs",
          userId
        );
        if (userData.success) {
          console.log(userData);
          const newPosts = userData.posts.filter(
            (post) => post.id !== lastPostId
          );
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          if (newPosts.length > 0) {
            setLastPostId(newPosts[newPosts.length - 1].id);
          } else {
            setAllPostsFetched(true);
          }
        } else {
          console.error("Error fetching user data:", userData.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    const observer = new IntersectionObserver((entries) => {
      const sentinel = entries[0];
      if (sentinel.isIntersecting && !loading && !allPostsFetched) {
        fetchData();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loading, lastPostId, token, allPostsFetched, userId]);

  return (
    <div>
      <ProfileHeader />
      <div className="mx-16">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
        <div ref={sentinelRef}></div>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
