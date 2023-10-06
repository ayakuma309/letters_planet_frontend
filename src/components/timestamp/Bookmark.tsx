import React from 'react';
import useTimeFormatter from '@/hooks/useTimeFormatter';
import { BookmarkType, User } from '@/types/types';
import { BsFillTrashFill } from 'react-icons/bs';

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
    <>
      <div className='mb-4 flex items-center justify-center'>
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
        <div className='mt-2 mx-1'>
          {user && bookmark.user && user.id === bookmark.user.id && (
            <button
              className='font-bold text-red-700'
              onClick={() => handleDelete(bookmark.id)}
            >
              <BsFillTrashFill />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookmark;
