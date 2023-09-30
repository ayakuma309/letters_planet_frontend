import React, { Suspense, useState } from "react";
import Post from "./Post";
import apiClient from "@/lib/apiClient";
import { PostType } from "@/types/types";
import tagOptions from "@/json/tag.json";
import useSWR from 'swr';

interface OptionType {
  value: string;
  label: string;
}

const Timeline = () => {
  const { data: latestPosts, error } = useSWR('/posts/get_latest_posts', (url) =>
    apiClient.get(url).then((res) => res.data)
  );

  //最近の投稿を取得
  const [searchResults, setSearchResults] = useState<PostType[]>([]);
  //タグ検索
  const handleSearch = (tag: OptionType) => {
    const newSearchTerm = tag.label;
    const results = latestPosts.filter(
      (post: PostType) => post.tags?.some((tag) => tag.name === newSearchTerm),
    );
    setSearchResults(results || []);
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
            {error && <div>データの読み込み中にエラーが発生しました。</div>}
            {searchResults.length > 0 ? searchResults.map((post: PostType) => (
              <Post key={post.id} post={post} />
            )):(
              <Suspense fallback={<div>Loading...</div>}>
                {latestPosts &&  latestPosts.length > 0 && latestPosts.map((post: PostType) => (
                  <Post key={post.id} post={post} />
                ))}
              </Suspense>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Timeline;
