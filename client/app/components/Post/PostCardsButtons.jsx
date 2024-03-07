import React from "react";
import VotingButtons from "./VotingButtons";

export default function PostCardsButtons({}) {
  return (
    <div>
      <VotingButtons />
      <button>Favs</button>
      <button>Share</button>
      <button>Comments</button>
    </div>
  );
}
