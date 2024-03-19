import React, { useEffect, useState } from "react";
import { getComments } from "@/app/lib/comments";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import cookie from "js-cookie";
import SortComments from "./SortComments";

export default function Comments({ post, setRefresh, refresh, post_id}) {
  const [comments, setComments] = useState([]);
  const token = cookie.get("user_token");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (post) {
          // Ensure post is not null or undefined
          console.log(post);
          const data = await getComments(post_id);
          if (data.success) {
            setComments(data.comments);
          }
          console.log(data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post, post_id]);

  return (
    <div className="mt-10">
      <SortComments setRefresh={setRefresh} refresh={refresh} post={post}/>
      <AddComment
        post_id={post_id}
        token={token}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      {comments && comments.length != 0 ? (
        <div>
          {comments.map((comment) => (
            // Render each comment here
            <CommentCard
              key={comment?.id}
              comment={comment}
              setRefresh={setRefresh}
              refresh={refresh}
              token={token}
            />
          ))}
        </div>
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}
