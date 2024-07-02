"use client";

import { useState } from "react";
import EmojiList from "./emojiList";

export default function Emojis() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(true);
  };

  const handleLoadingEnd = () => {
    setLoading(false);
  };

  return (
    <main className="p-4 w-full relative">
      <div className="grid grid-cols-10 flex-wrap pb-20">
        {Array.from({ length: page }, (_, index) => (
          <EmojiList
            page={String(index + 1)}
            key={index}
            handleLoading={handleLoading}
            handleLoadingEnd={handleLoadingEnd}
          />
        ))}
      </div>
      <div>
        <button
          type="button"
          disabled={loading}
          onClick={() => setPage(page + 1)}
          className={`fixed bottom-0 left-0 w-full bg-white text-black py-4 text-3xl bg-opacity-70 hover:bg-opacity-100 hover:bg-orange-400 transition-all hover:text-white ${
            loading &&
            "bg-inherit text-opacity-0 hover:bg-inherit hover:text-opacity-0"
          }`}
        >
          もっと見る
        </button>
      </div>
      {loading && (
        <div className="fixed w-full top-0 left-0 min-h-screen bg-black bg-opacity-50 text-white flex justify-center items-center text-8xl">
          Now Loading...
        </div>
      )}
    </main>
  );
}
