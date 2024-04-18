import React from "react";
import CommentMenu from "./CommentMenu";
import CommentLikeButtons from "./CommentLikeButtons";
import CommentReplies from "./CommentReply/CommentReplies";
import { AvatarDefault } from "../General/ProfilePic";
import { useAppSelector } from "@/app/store/reduxhooks";

export default function CommentCard({
  comment,
  post,
  token,
  setRefresh,
  refresh,
  isReply,
}) {
  const userData = useAppSelector((state) => state.auth.userData);
  return (
    <div className="mt-6 w-[275px] md:w-[400px]">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-4 my-2">
            <AvatarDefault size={"sm"} />
            <h3>
              {comment?.user?.userName ? comment?.user?.userName : "User"}
            </h3>
          </div>

          <p className="break-words w-[235px] md:w-[400px]">
            {comment.textbody}
          </p>
        </div>
        <div>
          {comment?.user?.id == userData?.id && (
            <CommentMenu
              comment={comment}
              token={token}
              setRefresh={setRefresh}
              refresh={refresh}
              type={isReply ? "commentreply" : "comment"}
            />
          )}
        </div>
      </div>
      {!isReply && (
        <CommentLikeButtons
          token={token}
          comment={comment}
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
