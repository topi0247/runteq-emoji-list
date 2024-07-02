"use client";

import useSWR from "swr";
import EmojiImage from "./emoji";
import { useEffect } from "react";

interface Emoji {
  id: string;
  creator_id: string;
  name: string;
  create_at: number;
  update_at: number;
  delete_at: number;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`An error occurred: ${res.status}`);
    }
    return res.json();
  });

export default function EmojiList({
  page,
  handleLoading,
  handleLoadingEnd,
}: {
  page: string;
  handleLoading: () => void;
  handleLoadingEnd: () => void;
}) {
  const { data } = useSWR(`/api/emojis/${page}`, fetcher);

  useEffect(() => {
    if (data) {
      handleLoadingEnd();
    } else {
      handleLoading();
    }
  }, [data]);

  if (!data) return;

  return (
    <>
      {data &&
        data.map((emoji: Emoji) => (
          <EmojiImage key={emoji.id} id={emoji.id} name={emoji.name} />
        ))}
    </>
  );
}
