"use client";

import PostCard from "@/app/components/Post/PostCard";
import PostSearch from "../../components/Search/PostSearch.jsx";
import { getAllPosts } from "@/app/lib/post";
import { useEffect, useState } from "react";
import CreatePost from "@/app/components/Post/CreatePost.jsx";

export default function Post() {
  const [loading, setLoading] = useState(false);
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(!loading);
      const posts = await getAllPosts();
      if (posts.success) {
        console.log(posts.post);
        setPosts(posts.post);
        setLoading(!loading);
        console.log(posts.post);
      } else {
        //take to error page or something
      }
    };

    fetchPost();
  }, []);

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

        {/* <Homepage/> */}
        {/* <div>
        {
          post && post.length >= 0 ? (
            post.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p></p>
          )
          // <Loading/>
        }
      </div> */}
      </div>
    </div>
  );
}
