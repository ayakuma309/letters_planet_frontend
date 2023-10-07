import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { Book } from '@/pages/api/books';
import { BsBookmark } from 'react-icons/bs';
import BookTagSelect from './BookTagSelect';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type Props = {
  book: Book;
};

interface OptionType {
  value: string;
  label: string;
}

const BookItem: React.FC<Props> = ({ book }) => {
  const user = useAuth();
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<OptionType[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // タグのラベルのみを取得
      const selectedTagNames = selectedTags.map((tag) => tag.label);

      // 本の投稿
      await apiClient.post('/books/book', {
        bookId: book.id,
        title: book.title,
        description: book.description,
        image: book.image,
        tags: selectedTagNames,
      });

      setSelectedTags([]);
      router.push('/');
      toast.success('投稿が完了しました');
    } catch (err) {
      toast.error('投稿に失敗しました');
    }
  };
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
      </div>
      {user && (
        <form onSubmit={handleSubmit}>
          <BookTagSelect
            value={selectedTags}
            onChange={(tags) => setSelectedTags(tags)}
          />
          <button
            type='submit'
            className='mt-2 bg-gray-700 hover:bg-green-800 duration-200 text-white font-semibold py-2 px-3 rounded-lg hover:shadow-lg block'
          >
            <BsBookmark />
          </button>
        </form>
      )}
    </div>
  );
};

export default BookItem;
