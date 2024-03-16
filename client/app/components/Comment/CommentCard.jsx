import React from "react";
import CommentMenu from "./CommentMenu";
import CommentLikeButtons from "./CommentLikeButtons";
import CommentReplys from "./CommentReplys";

export default function CommentCard({
  comment,
  post,
  token,
  setRefresh,
  refresh,
}) {
  //need to show menu only when its ur comment
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3>User</h3>
          <p>{comment.textbody}</p>
        </div>
        <div>
          <CommentMenu comment_id={comment?.id} />
        </div>
      </div>
      <CommentLikeButtons
        token={token}
        comment_id={comment?.id}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <CommentReplys />
    </div>
  );
}
