import React from "react";
import CommentMenu from "./CommentMenu";

export default function CommentCard({ comment, post }) {
  //need to show menu only when its ur comment
  return (
    <div className="flex justify-between">
      <div>
        <h3>User</h3>
        <p>{comment.textbody}</p>
      </div>
      <div>
        <CommentMenu comment_id={comment?.id} />
      </div>
    </div>
  );
}
