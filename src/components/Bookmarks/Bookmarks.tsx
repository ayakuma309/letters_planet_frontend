import React, { useState } from 'react';
import apiClient from '@/lib/apiClient';
import { BookmarkType } from '@/types/types';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/auth';
import Bookmark from './Bookmark';

interface BookmarksProps {
  bookmarks: BookmarkType[];
  ytPlayer: YT.Player | undefined;
}

const Bookmarks: React.FC<BookmarksProps> = ({ bookmarks, ytPlayer }) => {
  const { user } = useAuth();
  const [latestBookmarks, setLatestBookmarks] =
    useState<BookmarkType[]>(bookmarks);
  //削除
  const handleDeleteBookmark = async (bookmarkId: number) => {
    const shouldDelete = window.confirm('このコメントを削除しますか？');
    if (!shouldDelete) return;

    try {
      await apiClient.delete(`/bookmarks/bookmark/${bookmarkId}`);
      setLatestBookmarks((prevBookmark) =>
        prevBookmark.filter((bookmark) => bookmark.id !== bookmarkId)
      );
      toast.success('削除しました');
    } catch (err) {
      toast.error('削除に失敗しました');
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='bg-white shadow-md rounded p-4 mb-4 w-80 mt-10'>
        {latestBookmarks &&
          latestBookmarks.map((bookmark) => (
            <Bookmark
              key={bookmark.id}
              ytPlayer={ytPlayer}
              bookmark={bookmark}
              handleDelete={handleDeleteBookmark}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default Bookmarks;
