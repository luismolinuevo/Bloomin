"use client";

import PostCard from "@/app/components/Post/PostCard";
import PostSearch from "../../components/Search/PostSearch.jsx";
import CreatePost from "@/app/components/Post/CreatePost.jsx";
import { useAppSelector } from "@/app/store/reduxhooks.js";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/app/lib/post.js";

export default function Post() {
  const userId = useAppSelector((state) => state.auth.userData);
  const token = cookie.get("user_token");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true); // Keep track if there are more posts
  const [loadedPostIds, setLoadedPostIds] = useState([]); // Keep track of loaded post IDs

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts(token, skip);
        if (response.success) {
          const newPosts = response.posts.filter(
            (post) => !loadedPostIds.includes(post.id)
          );
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          // Update the list of loaded post IDs
          setLoadedPostIds((prevIds) => [
            ...prevIds,
            ...newPosts.map((post) => post.id),
          ]);
          // Check if the number of fetched posts is less than the take parameter
          if (response.posts.length < 10) {
            setHasMore(false); // No more posts available
          }
        } else {
          console.error("Error fetching posts:", response.error);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    // Fetch data only when the component mounts or when more posts are available
    if (hasMore && (skip === 0 || loadedPostIds.length < skip)) {
      fetchData();
    }
  }, [skip, hasMore, token, loadedPostIds]); // Fetch data when skip, hasMore, token, or loadedPostIds changes

  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + 10);
  };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //     ) {
  //       if (!loading && hasMore) {
  //         // Load more posts when the user scrolls to the bottom and there are more posts to load
  //         loadMore();
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [loading, hasMore]); // Add loading and hasMore to the dependency array

  return (
    <div>
      <PostSearch />
      <div className="mx-16 flex justify-between items-center">
        <p className="text-[40px] text-[#459857]">Recommended</p>
        <button className="bg-[#459858] text-white rounded-2xl p-2">
          Sort by
        </button>
      </div>

      <div className="mx-16">
        <CreatePost />

        <div>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
