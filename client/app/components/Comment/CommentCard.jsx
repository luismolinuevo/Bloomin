import React from "react";
import CommentMenu from "./CommentMenu";
import CommentLikeButtons from "./CommentLikeButtons";
import CommentReplies from "./CommentReply/CommentReplies";

export default function CommentCard({
  comment,
  post,
  token,
  setRefresh,
  refresh,
  isReply,
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
      {!isReply && (
        <CommentLikeButtons
          token={token}
          comment_id={comment?.id}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
      {!isReply && (
        <CommentReplies
          comment_id={comment?.id}
          token={token}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </div>
  );
}
