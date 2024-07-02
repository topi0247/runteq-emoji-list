"use client";

import useSWR from "swr";
import Image from "next/image";
import { useState, useEffect } from "react";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob));

export default function EmojiImage({ id, name }: { id: string; name: string }) {
  const { data } = useSWR(`/api/emoji/${id}`, fetcher);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setImageSrc(data);
      return () => URL.revokeObjectURL(data);
    }
  }, [data]);

  if (!imageSrc) return;

  return (
    <div className="w-full aspect-square relative">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={name}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      )}
      <div className="absolute w-full h-full top-0 left-0 opacity-0 justify-center items-center hover:opacity-100 hover:bg-black hover:bg-opacity-50 hover:text-white text-xl flex-wrap">
        :{name}:
      </div>
    </div>
  );
}
