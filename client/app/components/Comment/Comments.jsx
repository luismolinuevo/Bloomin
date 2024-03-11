import React, { useEffect } from "react";
import { getComments } from "@/app/lib/comments";

export default function Comments({ post_id }) {
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(post_id);
        console.log(data);
      } catch (error) {}
    };

    fetchComments();
  }, []);
  return <div>Comments</div>;
}
