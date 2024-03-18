import { votePost } from "@/app/lib/post";

export default function VotingButtons({ post, token, post_upvotes }) {
  const vote = async (type) => {
    try {
      console.log(type)
      const voting = await votePost(post?.id, token, type);
      console.log(voting);
    } catch (error) {
      console.log("Voting not working ", error);
    }
  };
  return (
    <div className="border p-2 bg-gray-300 rounded-lg flex items-center gap-2 ">
      <div>
        <button
          onClick={() => vote("like")}
          title="Like"
          className="flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
          <p>{post?.likeCount}</p>
        </button>
        <p>{post_upvotes && post_upvotes}</p>
      </div>
      <p className="border border-[#459858] h-full"></p>
      <button onClick={() => vote("dislike")} title="Dislike">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </button>
    </div>
  );
}
