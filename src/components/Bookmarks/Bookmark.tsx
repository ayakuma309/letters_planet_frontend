import React from 'react';
import useTimeFormatter from '@/hooks/useTimeFormatter';
import { BookmarkType, User } from '@/types/types';

interface BookmarkProps {
  bookmark: BookmarkType;
  ytPlayer: YT.Player | undefined;
  handleDelete: (bookmarkId: number) => void;
  user: User | null;
}

const Bookmark: React.FC<BookmarkProps> = ({
  bookmark,
  ytPlayer,
  handleDelete,
  user,
}) => {
  const timeToLink = () => {
    if (ytPlayer) {
      ytPlayer.seekTo(parseInt(bookmark.startAt.toString(), 10), true);
    }
  };

  return (
    <div>
      <div className='bg-white shadow-md rounded p-4 mb-4 w-1/2 mt-10'>
        <div className='mb-4'>
          <div className='text-gray-700 break-all'>
            <a
              href='#'
              onClick={timeToLink}
              className='link'
              style={{ color: '#2e63f5' }}
            >
              {useTimeFormatter(bookmark.startAt)} : {bookmark.title}
            </a>
          </div>
          <div className='flex justify-end mt-2 mx-1'>
            {user && bookmark.user && user.id === bookmark.user.id && (
              <button
                className='p-2 bg-red-500 rounded-md text-white font-bold'
                onClick={() => handleDelete(bookmark.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
