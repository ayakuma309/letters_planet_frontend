import React, { useState } from 'react';
import { BookmarkType } from '@/types/types';
import { useAuth } from '@/context/auth';
import useTimeFormatter from '@/hooks/useTimeFormatter';

interface BookmarkProps {
  bookmarks: BookmarkType[];
}

const Bookmarks: React.FC<BookmarkProps> = ({ bookmarks }) => {
  const { user } = useAuth();
  const [latestBookmarks] = useState<BookmarkType[]>(bookmarks);

  return (
    <div className='mt-10'>
      <div className='border-b py-2'>
        {latestBookmarks &&
          latestBookmarks.map((bookmark) => (
            <div key={bookmark.id}>
              <div className='bg-white shadow-md rounded p-4 mb-4 w-1/2 mt-10'>
                <div className='mb-4'>
                  <div className='text-gray-700 break-all'>
                    {useTimeFormatter(bookmark.startAt)} : {bookmark.title}
                  </div>
                  <div className='flex justify-end mt-2 mx-1'>
                    {user && bookmark.user && user.id === bookmark.user.id && (
                      <button className='p-2 bg-red-500 rounded-md text-white font-bold'>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Bookmarks;
