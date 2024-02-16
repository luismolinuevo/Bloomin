import VotingButtons from "./VotingButtons";

export default function PostCard({ post }) {
  return (
    <div>
      <div className="flex justify-between">
        <img src="post_img" />
        <div>
          <h1>Test</h1>
          <p>
            asdfasf asdfasfd asdfasdf dfsadf sdasd eerer erer erere e
            erererererereeeere ererere eererer
          </p>
        </div>
        <div>
          <VotingButtons />
        </div>
      </div>
      <div></div>
    </div>
  );
}
