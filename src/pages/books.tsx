import apiClient from '@/lib/apiClient';
import React from 'react';
import useSWR from 'swr';
import Books from '@/components/books/Books';
import { BooksType } from '@/types/types';

const fetcher = async (url: string): Promise<any> => {
  const res = await apiClient.get(url);
  return res.data;
};

const qiitas = () => {
  const { data: get_books, error } = useSWR('/books/get_books', fetcher);
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {error && <div>データの読み込み中にエラーが発生しました。</div>}
      {get_books && (
        <div>
          {get_books.map((book: BooksType) => (
            <Books key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default qiitas;
