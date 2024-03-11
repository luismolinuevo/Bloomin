import React, { useEffect, useState } from "react";
import { getComments } from "@/app/lib/comments";
import CommentCard from "./CommentCard";

export default function Comments({ post_id }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(post_id);
        console.log(data);
      } catch (error) {}
    };

    fetchComments();
  }, []);
  return (
    <div>
      {comments && comments.length !== 0 ? (
        <div>
          {comments.map((comment) => (
            // Render each comment here
            <CommentCard key={comment?.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}
