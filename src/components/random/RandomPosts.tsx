import React, { useEffect, useState } from 'react';
import { PostType } from '@/types/types';
import apiClient from '@/lib/apiClient';
import RandomPost from './RandomPost';
import Link from 'next/link';
import { ThreeDots } from 'react-loader-spinner';

const RandomPosts = () => {
  const [randomPosts, setRandomPosts] = useState<PostType[]>([]); // ランダムな3つの投稿
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/posts/get_latest_posts');

        const randomIndices = getRandomIndices(res.data.length, 3);
        const randoms = randomIndices.map((index) => res.data[index]);
        setRandomPosts(randoms);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // ローディング終了
      }
    };
    fetchLatestPosts();
  }, []);

  const getRandomIndices = (arrayLength: number, count: number) => {
    const indices = Array.from({ length: arrayLength }, (_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  return (
    <>
      {loading ? (
        <div>
          <ThreeDots
            height='80'
            width='80'
            radius='9'
            color='#fcede6'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <div className='flex flex-wrap  my-10 justify-center'>
          <div className='flex flex-wrap my-10 justify-center'>
            {randomPosts &&
              randomPosts.map((post: PostType) => (
                <RandomPost key={post.id} post={post} />
              ))}
          </div>
        </div>
      )}
      <Link href={`/posts_page`}>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
          一覧へ
        </button>
      </Link>
    </>
  );
};

export default React.memo(RandomPosts);
