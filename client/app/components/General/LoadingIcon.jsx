import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 text-gray-500 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm14-2.582c1.865-2.114 3-4.896 3-7.938h-4a7.96 7.96 0 01-2 5.291l3 2.647zM8 20v4c6 0 10-4 10-8h-4c0 2.21-1.343 4-3 4z"
        ></path>
      </svg>
      <span className="text-gray-500">Loading...</span>
    </div>
  );
}
