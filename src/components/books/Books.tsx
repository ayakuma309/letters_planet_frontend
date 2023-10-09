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
      toast.success('投稿を削除しました');
    } catch (err) {
      toast.error('投稿の削除に失敗しました');
    }
  };
  return (
    <div className='m-1 py-3 px-8  rounded-lg shadow-lg lg:w-1/4  w-1/3'>
      <div className='flex flex-col items-center mt-3 justify-center'>
        <img
          className='w-100 h-100 rounded mr-4'
          alt='User Avatar'
          src={book.image}
        />
        {/* <p className='text-gray-700'>{book.title}</p> */}
        {/* <div className='flex flex-wrap items-center justify-center m-2'>
          {book.tags.length > 0 &&
            book.tags.map((tag, index) => (
              <span
                key={index}
                className='inline-block bg-gray-500 text-white rounded-full px-3 py-1 text-sm font-semibold  mr-2'
              >
                {tag.name}
              </span>
            ))}
        </div> */}
        {/* <p className='text-gray-700'>{book.description}</p> */}
      </div>
      {user && user.id === book.author.id && (
        <button
          className='p-1 rounded-md font-bold text-2xl'
          onClick={() => handleDelete(book.id)}
        >
          <BsFillTrashFill />
        </button>
      )}
    </div>
  );
};

export default Books;
