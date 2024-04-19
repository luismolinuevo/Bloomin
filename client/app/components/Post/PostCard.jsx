import VotingButtons from "./VotingButtons";
import Link from "next/link";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/solid";
import PostMenu from "./PostMenu";
import PostCardsButtons from "./PostCardsButtons";
import ShowMoreText from "../General/ShowMoreText";
import { useAppSelector } from "@/app/store/reduxhooks";
import { AvatarDefault } from "../General/ProfilePic";

export default function PostCard({ post, token, setLoading }) {
  const userData = useAppSelector((state) => state.auth.userData);
  return (
    <div className="flex">
      <div className="border-b p-4 w-full">
        <div className="flex justify-between font-sans">
          <Link
            href={`/profile/${post?.userId}`}
            className="flex items-center gap-4 mb-2"
          >
            <AvatarDefault size={"md"} />
            <h3 className="text-[16px] sm:text-[19px] font-bold break-words">
              {post?.user?.userName}
            </h3>
          </Link>

          {post?.user?.id == userData?.id && (
            <PostMenu post={post} token={token} setLoading={setLoading} />
          )}
        </div>
        <div className="flex flex-col lg:flex-row">
          {post?.img != null && (
            <div className="lg:mr-7 flex-shrink-0">
              <img
                src={post?.img}
                className="bg-cover bg-center object-center bg-black rounded-xl w-[400px] h-[300px]"
              />
            </div>
          )}
          <div className="w-full sm:w-[50%] max-w-[600px]">
            <h1 className="text-[22px] sm:text-[25px] break-words font-bold">
              {post?.title}
            </h1>
            <p className="break-words text-[18px]">
              <ShowMoreText text={post?.description} maxLength={150} />
            </p>
            <div className="text-[16px] mt-4 font-bold">
              <h4>Cost: {post?.cost}</h4>
              <h4>Living Situation: {post?.livingSituation}</h4>
              <h4>Difficulty: {post?.implementationDifficulty}</h4>
            </div>
          </div>
        </div>
        <div>
          <PostCardsButtons post={post} setLoading={setLoading} />
          {/* <button>
            <img src="favs" alt="" />
          </button>
          <button></button>
          <button></button> */}
        </div>
      </div>
      {/* <div></div> */}
    </div>
  );
}
