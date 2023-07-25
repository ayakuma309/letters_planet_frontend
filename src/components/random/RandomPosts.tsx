import React, { useEffect, useState } from "react";
import { PostType } from "@/types/types";
import apiClient from "@/lib/apiClient";
import RandomPost from "./RandomPost";
import Link from "next/link";

const RandomPosts = () => {
  const [randomPosts, setRandomPosts] = useState<PostType[]>([]); // ランダムな3つの投稿
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await apiClient.get("/posts/get_latest_posts");

        const randomIndices = getRandomIndices(res.data.length, 3);
        const randomPosts = randomIndices.map((index) => res.data[index]);
        setRandomPosts(randomPosts);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  const getRandomIndices = (arrayLength: number, count: number) => {
    const indices = Array.from({ length: arrayLength }, (_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  if (loading) {
    return <p>時間がかかることをお許しください...</p>;
  }

  return (
    <>
      <div className="flex flex-wrap  my-10 justify-center">
        <div>
          <p className="text-3xl font-bold">
            あなたは最高の動画を受け取りました
          </p>
          <p className="my-3">
            詳細ページでメッセージを💌
            <br />
            (⚠️ログインしてないとメッセージは送れません)
          </p>
        </div>
        <div className="flex flex-wrap my-10 justify-center">
          {randomPosts.map((post: PostType) => (
            <RandomPost key={post.id} post={post} />
          ))}
        </div>
      </div>
      <Link href={`/posts_page`}>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          一覧へ
        </button>
      </Link>
    </>
  );
};

export default RandomPosts;
