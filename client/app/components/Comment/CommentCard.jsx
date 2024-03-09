import React from "react";
import CommentMenu from "./CommentMenu";

export default function CommentCard({ comment, post }) {
  return (
    <div>
      <div>
        <h3>User</h3>
        <p>Comment</p>
      </div>
      <div>
        <CommentMenu comment_id={comment?.id} />
      </div>
    </div>
  );
}
