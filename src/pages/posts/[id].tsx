import React, { useState } from 'react';
import apiClient from '@/lib/apiClient';
import { BookmarkType, PostType } from '@/types/types';
import { GetServerSideProps } from 'next';
import Youtube from 'react-youtube';
import TagList from '@/components/posts/TagList';
import { TwitterShareButton } from 'react-share';
import NewBookmarkModal from '@/components/timestamp/NewBookmarkModal';
import useNewBookmarkModal from '@/hooks/useNewBookmarkModal';
import Bookmarks from '@/components/timestamp/Bookmarks';
import { useAuth } from '@/context/auth';

type Props = {
  post: PostType;
  bookmarks: BookmarkType[];
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.query;
  const postId = id;
  try {
    const [postResponse, bookmarksResponse] = await Promise.all([
      apiClient.get(`/posts/post/${id}`),
      apiClient.get(`/bookmarks/bookmarks/${postId}`),
    ]);

    return {
      props: {
        post: postResponse.data,
        bookmarks: bookmarksResponse.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

const PostDetail = ({ post, bookmarks }: Props) => {
  const { user } = useAuth();
  const newBookmarkModal = useNewBookmarkModal();
  const [YTPlayer, setYTPlayer] = useState<YT.Player>();
  const [time, setTime] = useState<number>();
  const makeYTPlayer = (e: { target: YT.Player }) => {
    setYTPlayer(e.target);
  };

  const handleMakeTimestamp = () => {
    //再生を一時停止
    YTPlayer?.pauseVideo();
    //再生時間を取得
    setTime(YTPlayer?.getCurrentTime());
    newBookmarkModal.onOpen();
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-white shadow-md rounded p-4 mb-4'>
        <div className='mb-4'>
          <Youtube
            videoId={post.videoId}
            className='w-100 h-100 rounded-md  mx-auto'
            onReady={makeYTPlayer}
          />
          <p className='text-xl font-bold my-2'>{post.title}</p>
          <div className='flex justify-between'>
            {post.tags && post.tags.length > 0 && <TagList tags={post.tags} />}
            <TwitterShareButton
              hashtags={['おすすめ動画']}
              url={`https://www.youtube.com/watch?v=${post.videoId}`}
            >
              <div className='text-white font-bold rounded mr-5 bg-black px-2 py-1'>
                \uD835\uDD4F
              </div>
            </TwitterShareButton>
          </div>
        </div>
      </div>
      {user && (
        <>
          <div className='text-center'>
            <button
              className='p-4 bg-orange-500 rounded-md text-white font-bold'
              onClick={handleMakeTimestamp}
            >
              タイムスタンプ作成
            </button>
          </div>
          <NewBookmarkModal postId={post.id} time={time} />
        </>
      )}
      {bookmarks.length != 0 && (
        <Bookmarks bookmarks={bookmarks} ytPlayer={YTPlayer} />
      )}
    </div>
  );
};

export default PostDetail;
