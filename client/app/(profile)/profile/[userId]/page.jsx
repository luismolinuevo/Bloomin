"use client";

import ProfileHeader from "@/app/components/Profile/ProfileHeader";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAllUserPosts } from "@/app/lib/post";
import cookie from "js-cookie";
import PostCard from "@/app/components/Post/PostCard";
import { getUserProfileData } from "@/app/lib/auth";
import PostTab from "@/app/components/Profile/PostTab";

//User profile page
export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("userposts");
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

        // Fetch user profile data
        const userProfileData = await getUserProfileData(token, user_id);
        if (userProfileData.success) {
          setUserData(userProfileData);
        } else {
          console.error("Unable to fetch user profile data");
        }

        const userData = await getAllUserPosts(
          token,
          lastPostId,
          "",
          tab,
          user_id
        );

        console.log(userData);
        if (userData.success) {
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

  const handleTabChange = (tabChange) => {
    setTab(tabChange);
    setPosts([]);
    setLastPostId(null);
    setAllPostsFetched(false);
  };

  const reload = () => {
    setPosts([]); // Clear posts when changing sort criteria
    setLastPostId(null); // Reset lastPostId to null when changing sort criteria
    setAllPostsFetched(false);
  };

  return (
    <div className="">
      <ProfileHeader user={userData} token={token} setLoading={setLoading} reload={reload}/>
      <PostTab setTab={handleTabChange} tab={tab} />
      <div className="mx-16">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} reload={reload} />
        ))}

        <div ref={sentinelRef}></div>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
