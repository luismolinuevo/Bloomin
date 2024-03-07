import VotingButtons from "./VotingButtons";

export default function PostCard({ post }) {
  return (
    <div className="flex justify-center">
      <div className="border border-black">
        <div className="flex justify-between">
          <h3>Username</h3>
          <button>Menu</button>
        </div>

        <div>
          <h1>Test</h1>
          <p>
            asdfasf asdfasfd asdfasdf dfsadf sdasd eerer erer erere e
            erererererereeeere ererere eererer
          </p>
        </div>
        <img src="post_img" />
        <div>
          <VotingButtons />
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
