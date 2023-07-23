import React, { useEffect, useState } from 'react'
import Post from './Post'
import apiClient from '@/lib/apiClient';
import { PostType } from '@/types/types';
import tagOptions from '@/json/tag.json'
import Link from 'next/link';
import { useAuth } from '@/context/auth';


interface OptionType {
  value: string;
  label: string;
}

const Timeline = () => {
  //最近の投稿を取得
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<PostType[]>([]);

  // ログイン状態を取得
  const { user } = useAuth();

  //最近の投稿を取得
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try{
        const res = await apiClient.get("/posts/get_latest_posts");
        setLatestPosts(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchLatestPosts();
  }, []);

  //タグ検索
  const handleSearch = (tag: OptionType) => {
    setSearchTerm(tag.label);
    const results = latestPosts.filter((post) =>
      post.tags?.some((tag) => tag.name === searchTerm)
    );
    setSearchResults(results);
  };

  //投稿の削除
  const handleDeletePost = (postId: number) => {
    setLatestPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      { user && (
        <div className="text-center mb-5">
          <Link href="/search">
            <button className="bg-orange-400 rounded-full p10 w-16 h-16 font-bold text-3xl text-center">
              +
            </button>
          </Link>
        </div>
      )}
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto py-4">
          <div className='mt-3 mb-5 flex flex-wrap'>
            {tagOptions && tagOptions.map((tag) => (
              <span
                className="bg-gray-300 text-gray-800 px-2 py-1 rounded-full text-xs mr-2 mb-2 cursor-pointer"
                onClick={()=>handleSearch(tag)}
                key={tag.value}
              >
                {tag.label}
              </span>
            ))}
          </div>
           {/* 検索結果を表示 */}
          {searchResults.length > 0 ? (
            searchResults.map((post: PostType) => (
              <Post key={post.id} post={post} onDelete={(postId) => handleDeletePost(postId)} />
            ))
          ) : (
            latestPosts.map((post: PostType) => (
              <Post key={post.id} post={post} onDelete={(postId) => handleDeletePost(postId)} />
            ))
          )}
        </main>
      </div>
    </div>
  )
}

export default Timeline
