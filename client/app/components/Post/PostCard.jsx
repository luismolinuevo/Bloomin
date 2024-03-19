import VotingButtons from "./VotingButtons";
import Link from "next/link";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/solid";
import PostMenu from "./PostMenu";
import PostCardsButtons from "./PostCardsButtons";
import ShowMoreText from "../General/ShowMoreText";
import { useAppSelector } from "@/app/store/reduxhooks";
import { AvatarDefault } from "../General/ProfilePic";

export default function PostCard({ post }) {
  const userData = useAppSelector((state) => state.auth.userData);
  return (
    <div className="flex">
      <div className="border-b p-4 w-full">
        <div className="flex justify-between font-sans">
          <div className="flex items-center gap-4 mb-2">
            <AvatarDefault size={"lg"}/>
            <h3 className="text-[19px] font-bold">{post?.user?.userName}</h3>
          </div>

          {post?.user?.id == userData?.id && <PostMenu post={post} />}
        </div>
        <div className="flex">
          {post?.img != null && (
            <div className=" mr-7 flex-shrink-0">
              <img
                src={post?.img}
                className="bg-cover bg-center object-center bg-black rounded-xl w-[400px] h-[300px]"
              />
            </div>
          )}
          <div className="w-[65%]">
            <h1 className="text-[25px] break-words font-bold">{post?.title}</h1>
            <p className="break-words text-[18px]">
              {/* <ShowMoreText text={post?.description} maxLength={150} /> */}
            </p>
            <div className="text-[16px] mt-4 font-bold">
              <h4>Cost: {post?.cost}</h4>
              <h4>Living Situation: {post?.livingSituation}</h4>
              <h4>Difficulty: {post?.implementationDifficulty}</h4>
            </div>
          </div>
        </div>
        <div>
          <PostCardsButtons post={post} />
          <button>
            <img src="favs" alt="" />
          </button>
          <button></button>
          <button></button>
        </div>
      </div>
      {/* <div></div> */}
    </div>
  );
}
