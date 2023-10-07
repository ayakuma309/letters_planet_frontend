import { useAuth } from '@/context/auth';
import apiClient from '@/lib/apiClient';
import { BooksType } from '@/types/types';

import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

type BookProps = {
  book: BooksType;
};
const Books: React.FC<BookProps> = ({ book }) => {
  const { user } = useAuth();

  const handleDelete = async (id: number) => {
    const shouldDelete = window.confirm('この投稿を削除しますか？');
    if (!shouldDelete) return;
    try {
      await apiClient.delete(`/books/book/${id}`);
      window.location.reload();
      toast.success('投稿を削除しました');
    } catch (err) {
      toast.error('投稿の削除に失敗しました');
    }
  };
  return (
    <div className='mb-3 py-3 px-8  rounded-lg shadow-lg w-10/12'>
      <div className='flex flex-wrap items-center justify-center'>
        {book.tags.length > 0 &&
          book.tags.map((tag, index) => (
            <span
              key={index}
              className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
            >
              {tag.name}
            </span>
          ))}
      </div>
      <div className='flex flex-col items-center mt-3 justify-center'>
        <img
          className='w-100 h-100 rounded mr-4'
          alt='User Avatar'
          src={book.image}
        />
        <p className='text-gray-700'>{book.title}</p>
        <p className='text-gray-700'>{book.description}</p>
      </div>
      {user && user.id === book.author.id && (
        <button
          className='p-1 bg-red-500 rounded-md text-white font-bold'
          onClick={() => handleDelete(book.id)}
        >
          <BsFillTrashFill />
        </button>
      )}
    </div>
  );
};

export default Books;
