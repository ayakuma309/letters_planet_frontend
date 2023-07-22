import React, { useState } from 'react';
import Style from "@/styles/search.module.css";
import VideoGrid from '@/components/search/VideoGrid';
import { youtube } from '@/lib/youtube';
import { GetServerSideProps } from 'next';
import VideoGridItem from '@/components/search/VideoGridItem';

const Search = ({ videos }: any) => {
  const [term, setTerm] = useState('');
  const [searchItems, setSearchItems] = useState(videos);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await youtube.get('/search', {
        params: {
          q: term, // 検索ワードをパラメータに追加
        },
      });
      setSearchItems(response.data.items);
    } catch (error) {
      console.log(error);
      setSearchItems([]); // エラー時は空の配列を設定
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className='flex justify-center'>
          <input
            type="text"
            placeholder='検索'
            onChange={e => setTerm(e.target.value)}
            value={term}
            className='p-5 rounded-md'
          />
          <button type="submit" className='p-4 bg-orange-500 rounded-md text-white font-bold'>
            検索
          </button>
        </form>
      </div>
      <VideoGrid>
        {searchItems.length > 0 ? ( // searchItemsが空でない場合に動画を表示
          searchItems.map((search:any) => {
            return (
              <VideoGridItem
                id={search.id.videoId}
                key={search.id.videoId}
                src={search.snippet.thumbnails.medium.url}
                title={search.snippet.title}
              />
            );
          })
        ) : (
          <span>該当する動画がありません</span> // searchItemsが空の場合に表示するメッセージ
        )}
      </VideoGrid>
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const response = await youtube.get('/search', {
      params: {
        q: 'エンジニア転職チャンネル', // 初期の検索ワードを設定
      },
    });
    const videos = response.data.items;

    return {
      props: {
        videos,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        videos: [], // エラー時は空の配列を設定
      },
    };
  }
};
