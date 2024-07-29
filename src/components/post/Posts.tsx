"use client";
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { laraEcho } from "@/lib/echo.config";

export default function Posts({ data }: { data: APIResponseType<PostType> }) {
  const [posts, setPosts] = useState<APIResponseType<PostType>>(data?.posts);

  useEffect(() => {
    laraEcho.channel("test-channel").listen("TestEvent", (event: any) => {
      console.log("the real time data is", event);
    });

    return () => {
      laraEcho.leave("test-channel");
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pl-2">
      {posts.data &&
        posts.data.length > 0 &&
        posts.data.map((item, index) => <PostCard post={item} key={index} />)}
    </div>
  );
}
