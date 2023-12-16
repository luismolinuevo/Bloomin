"use client";

import React, { useState } from "react";

export default function Google() {
  const [token, setToken] = useState("");

  const handleGoogleAuth = () => {
    try {
      window.location.href = "http://localhost:5000/api/google";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-3">
      <button
        className="rounded-lg border-2 border-[#04444e] text-[#04444e] w-full py-2 text-[18px] my-6 flex items-center justify-center"
        onClick={handleGoogleAuth}
      >
        Sign in with Google
      </button>
    </div>
  );
}
