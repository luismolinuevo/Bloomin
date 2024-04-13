"use client";

import ProfileHeader from "@/app/components/Profile/ProfileHeader";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAllUserPosts } from "@/app/lib/post";
import cookie from "js-cookie";
import PostCard from "@/app/components/Post/PostCard";
import { getUserProfileData } from "@/app/lib/auth";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [allPostsFetched, setAllPostsFetched] = useState(false);
  const sentinelRef = useRef(null);
  const token = cookie.get("user_token");
  const user_id = params.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getAllUserPosts(
          token,
          lastPostId,
          "",
          "userliked",
          user_id
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
          console.error("Unable to fetch userdata");
        }
      } catch (error) {
        console.error("Error fetching user post:", error);
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
  }, [loading, lastPostId, token, allPostsFetched, user_id]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const fetchData = await getUserProfileData(token, user_id);

        if (fetchData.success) {
          console.log(fetchData);
          setUserData(fetchData);
        } else {
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [user_id]);

  return (
    <div>
      <ProfileHeader user={userData} token={token}/>
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
