"use client";

import React, { useState } from "react";

export default function ShowMoreText({ text, maxLength }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderText = () => {
    // Check if text is defined and not null before trimming
    const trimmedText = text ? text.trim() : "";

    if (trimmedText.length <= maxLength) {
      return trimmedText;
    }

    return showAll ? trimmedText : `${trimmedText.slice(0, maxLength)}...`;
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
