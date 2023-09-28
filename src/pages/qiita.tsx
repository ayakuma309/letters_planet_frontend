import React, { useState } from 'react'
import useSWR from "swr";


function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

const qiita = () => {
  const [query, setQuery] = useState('');
  const apiUrl = 'https://qiita.com/api/v2/items?per_page=25&query=';
  const { data, error } = useSWR(
    query ? `${apiUrl}${encodeURIComponent(query)}` : null,
    fetcher
  );


  return (
    <div>
    <h1>Qiita記事一覧</h1>
    <form>
      <input
        type="text"
        placeholder="検索クエリを入力"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
    {error && <div>データの読み込み中にエラーが発生しました。</div>}
    {data && (
      <div>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  )
}

export default qiita
