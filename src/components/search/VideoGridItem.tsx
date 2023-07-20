import React, { useState } from 'react'
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/router';
interface VideoGridItemProps {
  id: string;
  src: string;
  title: string;
}
const VideoGridItem:React.FC<VideoGridItemProps> = ({id,src,title}) => {
  const [postText, setPostText] = useState('');
  const router = useRouter();
  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.post("/posts/post", {
        videoId : id,
        url: src,
        title: title,
        description: postText,
      });

      // 投稿後、投稿フォームのテキストエリアをクリア
      setPostText("");
      router.push("/");
    } catch (err) {
      alert("入力内容が正しくありません。");
    }
  };

  return (
    <div className='flex flex-col' key={id}>
      <img src={src} alt={title}/>
      <span>{title}</span>
      <form onSubmit={handleSubmitPost}>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
        >
          投稿
        </button>
      </form>
    </div>
  )
}

export default VideoGridItem
