import React, { useEffect, useState } from "react";
import { getComments } from "@/app/lib/comments";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import cookie from "js-cookie";

export default function Comments({ post_id }) {
  const [comments, setComments] = useState([]);
  const token = cookie.get("user_token");
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
      <AddComment post_id={post_id} token={token}/>
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
