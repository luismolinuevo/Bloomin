"use client"

import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
  return (
    <div className="border-2 border-gray-400 rounded-2xl">
      <input type="search" className="outline-none  border-none rounded-2xl px-3 py-1" value={query} onChange={(e) => setQuery(e.target.value)}/>
    </div>
  );
}
