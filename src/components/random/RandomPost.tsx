import React from "react";
import Link from "next/link";
import { PostType } from "@/types/types";
import { TwitterShareButton } from "react-share";

type Props = {
  post: PostType;
};

const RandomPost: React.FC<Props> = ({ post }) => {
  return (
    <div style={{ width: "300px" }}>
      <TwitterShareButton
        title={`${post.title}`}
        hashtags={["校長への感謝"]}
        url={`https://www.youtube.com/watch?v=${post.videoId}`}
      >
        <div
          className="text-white font-bold rounded-full mr-5 bg-black  py-1 px-2"
        >
          \uD835\uDD4F
        </div>
      </TwitterShareButton>
      <div className="bg-white shadow-md rounded p-4 m-1 ">
        <div>
          <Link href={`/posts/${post.id}`}>
            <img
              src={post.url}
              className="w-100 h-100 rounded-md  mx-auto"
              alt="youtube image"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RandomPost);
