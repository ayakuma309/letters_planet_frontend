import { PostType } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import TagList from './TagList';
import apiClient from '@/lib/apiClient';
import { useAuth } from '@/context/auth';
import { toast } from 'react-toastify';

type Props = {
  post: PostType;
};

const Post: React.FC<Props> = ({ post }) => {
  const { user } = useAuth();

  const handleDeletePost = async () => {
    const shouldDelete = window.confirm('この投稿を削除しますか？');
    if (!shouldDelete) return;
    const id = post.id;
    try {
      await apiClient.delete(`/posts/post/${id}`);
      toast.success('投稿を削除しました');
    } catch (err) {
      toast.error('投稿の削除に失敗しました');
    }
  };

  return (
    <div className='md:w-1/2 p-2'>
      <div className='bg-white shadow-md rounded p-5 mb-4'>
        <div className='mb-4'>
          <Link href={`/posts/${post.id}`}>
            <img
              src={post.url}
              className='w-100 h-100 rounded-md  mx-auto'
              alt='youtube image'
            />
          </Link>
          <p className='break-words'>{post.title}</p>
          <div className='flex justify-between mt-2'>
            {/* タグ情報を表示 */}
            {post.tags && post.tags.length > 0 && <TagList tags={post.tags} />}
            {user && (
              <button
                className='p-2 bg-red-500 rounded-md text-white font-bold'
                onClick={handleDeletePost}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
