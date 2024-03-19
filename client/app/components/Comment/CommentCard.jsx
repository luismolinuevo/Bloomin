import React from "react";
import CommentMenu from "./CommentMenu";
import CommentLikeButtons from "./CommentLikeButtons";
import CommentReplies from "./CommentReply/CommentReplies";
import { AvatarDefault } from "../General/ProfilePic";

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
    <div className="mt-6">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-4 my-2">
            <AvatarDefault size={"sm"} />
            <h3>
              {comment?.user?.userName ? comment?.user?.userName : "User"}
            </h3>
          </div>

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
          comment={comment}
          token={token}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </div>
  );
}
