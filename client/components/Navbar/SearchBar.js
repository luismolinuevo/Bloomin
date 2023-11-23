"use client"

import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
  return (
    <div className="">
      <input type="search" placeholder="Search for advice" value={query} onChange={(e) => setQuery(e.target.value)}/>
    </div>
  );
}
