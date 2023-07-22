import { PostType } from '@/types/types'
import Link from 'next/link'
import React from 'react'
import TagList from './TagList'
import apiClient from '@/lib/apiClient'

type Props = {
  post: PostType
  onDelete: (postId: number) => void;
}

const Post:React.FC<Props> = ({post, onDelete}) => {

  const handleDeletePost = async () => {
    const shouldDelete = window.confirm('この投稿を削除しますか？');
    if (!shouldDelete) return;
    const id = post.id;
    try {
      await apiClient.delete(`/posts/post/${id}`);
      onDelete(id);
      window.location.reload();
    } catch (err) {
      alert('投稿の削除に失敗しました');
    }
  }
  return (
    <div>
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Link href={`/profile/${post.authorId}`}>
              <img
                src={post.author.profile?.profileImageUrl}
                className="w-10 h-10 rounded-full mr-2"
                alt="User Avatar"
              />
            </Link>

            <div>
              <h2 className="font-semibold text-md">{post.author?.username}</h2>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <Link href={`/posts/${post.id}`}>
            <img
              src={post.url}
              className="w-100 h-100 rounded-md  mx-auto"
              alt="youtube image"
            />
          </Link>
          <p>{post.title}</p>
          <p className="text-gray-700">{post.description}</p>
          <div className="flex justify-between mt-2">
            {/* タグ情報を表示 */}
            {post.tags && post.tags.length > 0 && <TagList tags={post.tags} />}
            <button
              className='p-2 bg-red-500 rounded-md text-white font-bold'
              onClick={handleDeletePost}
            >Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;
