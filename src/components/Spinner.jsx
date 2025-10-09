import React from "react";

export function Spinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-3">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-purple-600 font-semibold text-lg">{text}</p>
    </div>
  );
}