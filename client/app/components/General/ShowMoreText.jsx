"use client";

import React, { useState } from "react";

export default function ShowMoreText({ text, maxLength }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderText = () => {
    if (text.length <= 150) {
      return text;
    }

    return showAll ? text : `${text.slice(0, 150)}...`;
  };

  return (
    <div>
      <p>{renderText()}</p>
      {text.length > 150 && (
        <button onClick={toggleShowAll} className="text-blue-700 underline">
          {showAll ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
}
