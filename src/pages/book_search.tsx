import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import BookSearchForm from '@/components/books/BookSearchForm';
import BookList from '@/components/books/BookList';

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

const BookSearch: NextPage = () => {
  const [query, setQuery] = useState('');
  //検索ボタンをクリックした時の処理
  //サーバーサイドのAPIを呼び出し書籍情報を取得する
  const apiUrl = '/api/books?q=';
  const { data, error } = useSWR(
    query ? `${apiUrl}${encodeURIComponent(query)}` : null,
    fetcher
  );

  const onClickSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <>
      <h1>書籍検索</h1>
      <BookSearchForm onSearch={onClickSearch} />
      <BookList data={data} error={error} />
    </>
  );
};

export default BookSearch;
