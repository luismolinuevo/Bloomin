"use client";

import PostCard from "@/app/components/Post/PostCard";
import PostSearch from "../../components/Search/PostSearch.jsx";
import CreatePost from "@/app/components/Post/CreatePost.jsx";
import { useAppSelector } from "@/app/store/reduxhooks.js";
import cookie from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { getAllPosts } from "@/app/lib/post.js";
import SortPost from "@/app/components/Post/SortPost.jsx";

export default function Post() {
  const userId = useAppSelector((state) => state.auth.userData);
  const [sortType, setSortType] = useState("");
  const token = cookie.get("user_token");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [allPostsFetched, setAllPostsFetched] = useState(false); // New state variable to track if all posts have been fetched
  const sentinelRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts(token, lastPostId);
        if (response.success) {
          console.log(response.posts);
          const newPosts = response.posts.filter(
            (post) => post.id !== lastPostId
          ); // Filter out posts with the same ID as the last one
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          if (newPosts.length > 0) {
            setLastPostId(newPosts[newPosts.length - 1].id);
          } else {
            // If no new posts were fetched, it means all posts have been fetched
            setAllPostsFetched(true);
          }
        } else {
          console.error("Error fetching posts:", response.error);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
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
  }, [loading, lastPostId, token, allPostsFetched]);

  return (
    <div>
      <PostSearch />
      <div className="mx-16 flex justify-between items-center">
        <p className="text-[40px] text-[#459857]">Recommended</p>
        <SortPost setSortType={setSortType} sortType={sortType} />
      </div>

      <div className="mx-16">
        <CreatePost />

        <div>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
          <div ref={sentinelRef}></div>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
