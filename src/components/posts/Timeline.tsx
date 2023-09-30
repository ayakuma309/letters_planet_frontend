import React, { useEffect, useState } from "react";
import Post from "./Post";
import apiClient from "@/lib/apiClient";
import { PostType } from "@/types/types";
import tagOptions from "@/json/tag.json";

interface OptionType {
  value: string;
  label: string;
}

const Timeline = () => {
  //最近の投稿を取得
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<PostType[]>([]);

  //最近の投稿を取得
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await apiClient.get("/posts/get_latest_posts");
        setLatestPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLatestPosts();
  }, []);

  //タグ検索
  const handleSearch = (tag: OptionType) => {
    setSearchTerm(tag.label);
    const results = latestPosts.filter(
      (post) => post.tags?.some((tag) => tag.name === searchTerm),
    );
    setSearchResults(results);
  };

  //投稿の削除
  const handleDeletePost = (postId: number) => {
    setLatestPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postId),
    );
  };

  return (
    <div>
      <div className="min-h-screen">
        <main className="container mx-auto py-4">
          <div className="mt-3 mb-5 flex flex-wrap">
            {tagOptions &&
              tagOptions.map((tag) => (
                <div
                  onClick={() => handleSearch(tag)}
                  key={tag.value}
                >
                  <p className="bg-white text-gray-800 p-4 rounded-md text-xs mr-2 mb-2 cursor-pointer">{tag.label}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-wrap justify-between">
            {/* 検索結果を表示 */}
            {searchResults.length > 0
              ? searchResults.map((post: PostType) => (
                  <Post
                    key={post.id}
                    post={post}
                    onDelete={(postId) => handleDeletePost(postId)}
                  />
                ))
              : latestPosts.map((post: PostType) => (
                  <Post
                    key={post.id}
                    post={post}
                    onDelete={(postId) => handleDeletePost(postId)}
                  />
                ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Timeline;
