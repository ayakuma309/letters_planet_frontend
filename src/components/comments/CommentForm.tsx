import React, { useEffect, useState} from 'react';
import apiClient from '@/lib/apiClient';
import { CommentType } from '@/types/types';

interface CommentProps {
  postId: number;
  comments: CommentType[];
}

const CommentForm: React.FC<CommentProps> = ({ postId , comments}) => {
  const [commentText, setCommentText] = useState('');
  const [latestComments, setLatestComments] = useState<CommentType[]>(comments);

  // コメントの投稿
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newComment = await apiClient.post('/comments/comment', {
        postId: postId,
        content: commentText,
      });
      // コメント投稿後にコメント一覧を更新
      setLatestComments((prevComment)=> [newComment.data, ...prevComment]);
      setCommentText('');
    } catch (err) {
      alert('コメントの投稿に失敗しました');
    }
  };


  //コメントの削除
  const handleDeleteComment = async (commentId: number) => {
    const shouldDelete = window.confirm('このコメントを削除しますか？');
    if (!shouldDelete) return;

    try {
      await apiClient.delete(`/comments/comment/${commentId}`);
      setLatestComments((prevComment) =>
        prevComment.filter((comment) => comment.id !== commentId)
      );
    } catch (err) {
      alert('コメントの削除に失敗しました');
    }
  }
  return (
    <div className='mt-10'>
      <form onSubmit={handleSubmitComment}>
        <input
          className='p-4 rounded-md w-1/2'
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="この動画の感想をコメントしてください"
        />
        <button
          type="submit"
          className='p-4 bg-orange-500 rounded-md text-white font-bold'
        >
          コメントを投稿する
        </button>
      </form>
      <div className="border-b py-2">
        {latestComments && latestComments.map((comment) => (
          <div key={comment.id}>
            <div className="bg-white shadow-md rounded p-4 mb-4 w-1/2">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <img
                    src={comment.user.profile?.profileImageUrl}
                    className="w-10 h-10 rounded-full mr-2"
                    alt="User Avatar"
                  />
                  <div>
                    <h2 className="font-semibold text-md">{comment.user.username}</h2>
                    <p className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentForm;
