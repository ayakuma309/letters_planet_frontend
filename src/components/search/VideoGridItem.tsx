import React, { useState } from 'react';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/router';
import TagSelect from './TagSelect';
import { toast } from 'react-toastify';

interface VideoGridItemProps {
  id: string;
  src: string;
  title: string;
}

interface OptionType {
  value: string;
  label: string;
}

const VideoGridItem: React.FC<VideoGridItemProps> = ({ id, src, title }) => {
  const [postText, setPostText] = useState('');
  const [selectedTags, setSelectedTags] = useState<OptionType[]>([]);

  const router = useRouter();

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const selectedTagNames = selectedTags.map((tag) => tag.label);

      await apiClient.post('/posts/post', {
        videoId: id,
        url: src,
        title: title,
        description: postText,
        tags: selectedTagNames,
      });

      // 投稿後、投稿フォームのテキストエリアをクリア
      setPostText('');
      setSelectedTags([]);
      router.push('/');
      toast.success('投稿が完了しました');
    } catch (err) {
      toast.error('投稿に失敗しました');
    }
  };

  return (
    <div
      className='flex flex-col w-96 my-10 p-10 rounded-md shadow-lg bg-orange-100'
      key={id}
    >
      <img src={src} alt={title} />
      <span>{title}</span>
      <form onSubmit={handleSubmitPost}>
        <textarea
          className='w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
          placeholder='動画の詳細を教えてください'
          value={postText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPostText(e.target.value)
          }
        ></textarea>
        <TagSelect
          value={selectedTags}
          onChange={(tags) => setSelectedTags(tags)}
        />
        <button
          type='submit'
          className='mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded'
        >
          投稿
        </button>
      </form>
    </div>
  );
};

export default VideoGridItem;
