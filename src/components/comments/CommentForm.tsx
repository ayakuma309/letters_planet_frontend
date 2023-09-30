import React, {  useState } from "react";
import apiClient from "@/lib/apiClient";
import { CommentType } from "@/types/types";
import { useAuth } from "@/context/auth";
import { toast } from "react-toastify";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface CommentProps {
  postId: number;
  comments: CommentType[];
}

const CommentForm: React.FC<CommentProps> = ({ postId, comments }) => {
  const [commentText, setCommentText] = useState("");
  const [latestComments, setLatestComments] = useState<CommentType[]>(comments);
  const { user } = useAuth();

  // コメントの投稿
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText.trim() === '') {
      // コメントが空の場合は送信しない
      return;
    }
    try {
      const newComment = await apiClient.post("/comments/comment", {
        postId: postId,
        content: commentText,
      });
      // コメント投稿後にコメント一覧を更新
      setLatestComments((prevComment) => [newComment.data, ...prevComment]);
      setCommentText("");
      toast.success("コメントを投稿しました");
    } catch (err) {
      toast.error("コメントの投稿に失敗しました");
    }
  };

  //コメントの削除
  const handleDeleteComment = async (commentId: number) => {
    const shouldDelete = window.confirm("このコメントを削除しますか？");
    if (!shouldDelete) return;

    try {
      await apiClient.delete(`/comments/comment/${commentId}`);
      setLatestComments((prevComment) =>
        prevComment.filter((comment) => comment.id !== commentId),
      );
      toast.success("コメントを削除しました");
    } catch (err) {
      toast.error("コメントの削除に失敗しました");
    }
  };

  return (
    <div className="mt-10">
      <p className="font-bold my-1">
        動画と一緒にメッセージが送れます
      </p>
      <form onSubmit={handleSubmitComment}>
        <input
          className="p-4 rounded-md w-1/2"
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="この動画について"
        />
        <button
          type="submit"
          className="p-4 bg-orange-500 rounded-md text-white font-bold"
        >
          投稿する
        </button>
      </form>
      <div className="border-b py-2">
        {latestComments &&
          latestComments.map((comment) => (
            <div key={comment.id}>
              <div className="bg-white shadow-md rounded p-4 mb-4 w-1/2 mt-10">
                <div className="mb-4">
                  <p className="text-gray-700 break-all">
                  <TwitterTweetEmbed
                    tweetId={`${comment.content}`}
                  />
                  </p>
                  <div className="flex justify-end mt-2 mx-1">
                    {user && comment.user && user.id === comment.user.id && (
                      <button
                        className="p-2 bg-red-500 rounded-md text-white font-bold"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
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

export default CommentForm;
