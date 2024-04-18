import React, { useEffect, useState } from "react";
import { getComments } from "@/app/lib/comments";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import cookie from "js-cookie";
import SortComments from "./SortComments";
import LoadingSpinner from "../General/LoadingIcon";

export default function Comments({ post, setRefresh, refresh, post_id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = cookie.get("user_token");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        if (post) {
          const data = await getComments(post_id, token);

          if (data.success) {
            setComments(data.comments);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post, post_id]);

  return (
    <div className="mt-10">
      {loading && <LoadingSpinner />}
      <SortComments setRefresh={setRefresh} refresh={refresh} post={post} />
      <AddComment
        post_id={post_id}
        token={token}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      {comments && comments.length != 0 ? (
        <div className="">
          {comments.map((comment) => (
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
