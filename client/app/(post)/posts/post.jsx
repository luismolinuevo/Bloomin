"use client";

import PostCard from "@/app/components/Post/PostCard";
import PostSearch from "../../components/Search/PostSearch.jsx";
import { getAllPosts } from "@/app/lib/post";
import { useEffect, useState } from "react";

export default function Post() {
  const [loading, setLoading] = useState(false);
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(!loading);
      const posts = await getAllPosts();
      if (posts.success) {
        setPosts(post.post);
        setLoading(!loading);
        console.log(post.post);
      } else {
        //take to error page or something
      }
    };

    fetchPost();
  }, []);

  return (
    <div>
      <PostSearch />
      <div className="px-16 flex justify-between items-center">
        <p className="text-[40px] text-[#459857]">Recommended</p>
        <button className="bg-[#459858] text-white rounded-2xl p-2">Sort by</button>
      </div>

      <div className="px-16 py-20">
        
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