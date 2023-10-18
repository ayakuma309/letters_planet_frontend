import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { QiitaArticleProps } from '@/types/qiitaTypes';
import { useAuth } from '@/context/auth';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';

const QiitaArticle: React.FC<QiitaArticleProps> = ({
  id,
  url,
  title,
  tags,
  profileImageUrl,
}) => {
  const { user } = useAuth();

  const handleDeleteQiita = async (id: number) => {
    const shouldDelete = window.confirm('この投稿を削除しますか？');
    if (!shouldDelete) return;
    try {
      await apiClient.delete(`/qiitas/qiita/${id}`);
      window.location.reload();
      toast.success('投稿を削除しました');
    } catch (err) {
      toast.error('投稿の削除に失敗しました');
    }
  };

  return (
    <div className='mb-3 py-3 px-8  rounded-lg shadow-lg w-10/12'>
      <p className='text-center font-bold  text-blue-800 mb-4'>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
      </p>
      <div className='flex flex-wrap items-center justify-center'>
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <span
              key={index}
              className='inline-block bg-gray-100 shadow-lg rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
              style={{ backgroundColor: '#9bca77' }}
            >
              {tag.name}
            </span>
          ))}
      </div>
      <div className='flex items-center mt-3 justify-between'>
        <div>
          <img
            className='w-10 h-10 rounded-full mr-4'
            alt='User Avatar'
            src={profileImageUrl}
          />
        </div>
        {user && (
          <button
            className='p-1 rounded-md font-bold text-2xl'
            onClick={() => handleDeleteQiita(id)}
          >
            <BsFillTrashFill />
          </button>
        )}
      </div>
    </div>
  );
};

export default QiitaArticle;
