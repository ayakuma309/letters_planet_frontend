import React, { useState } from 'react';
import useSWR from 'swr';
import SearchForm from '@/components/qiita/SearchForm';
import QiitaList from '@/components/qiita/QiitaList';

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

const qiita_search = () => {
  const [query, setQuery] = useState('');
  const apiUrl = 'https://qiita.com/api/v2/items?per_page=25&query=';
  const { data, error } = useSWR(
    query ? `${apiUrl}${encodeURIComponent(query)}` : null,
    fetcher
  );

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <>
      <h1>Qiita記事一覧</h1>

      <SearchForm onSearch={handleSearch} />
      <QiitaList data={data} error={error} />
    </>
  );
};

export default qiita_search;
