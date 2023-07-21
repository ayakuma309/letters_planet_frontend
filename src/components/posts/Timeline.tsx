import React, { useEffect, useState } from 'react'
import Post from './Post'
import apiClient from '@/lib/apiClient';
import { PostType } from '@/types/types';

const Timeline = () => {
  //最近の投稿を取得
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);
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

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto py-4">
          {latestPosts && latestPosts.map((post: PostType) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </div>
  )
}

export default Timeline
