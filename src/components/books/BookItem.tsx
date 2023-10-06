import React from 'react';
import { useAuth } from '@/context/auth';
import { Book } from '@/pages/api/books';
import { BsBookmark } from 'react-icons/bs';

type Props = {
  book: Book;
};

const BookItem: React.FC<Props> = ({ book }) => {
  const user = useAuth();

  return (
    <div className='mb-3 py-3 px-8  rounded-lg shadow-lg w-10/12'>
      <p className='text-center font-bold  text-blue-800 mb-4'>
        {book.image ? <img src={book.image} /> : <div>No Image</div>}
      </p>
      <div className='flex flex-wrap items-center justify-center'>
        {book.categories &&
          book.categories.map((tab, index) => (
            <span
              key={index}
              className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
            >
              {tab}
            </span>
          ))}
      </div>
      <div className='flex items-center mt-3 justify-between'>
        <div>{book.description}</div>
        {user && (
          <button
            type='submit'
            className='mt-2 bg-gray-700 hover:bg-green-800 duration-200 text-white font-semibold py-2 px-3 rounded-lg hover:shadow-lg block'
          >
            <BsBookmark />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookItem;
