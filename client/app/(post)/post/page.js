"use client";

import PostCard from "@/app/components/Post/PostCard";
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
      } else {
        //take to error page or something
      }
    };

    fetchPost();
  }, []);

  return (
    <div>
      {
        post.length >= 0 ? (
          post.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p></p>
        )
        // <Loading/>
      }
    </div>
  );
}
