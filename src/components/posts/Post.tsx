import { PostType } from '@/types/types'
import Link from 'next/link'
import React from 'react'

type Props = {
  post: PostType
}

const Post:React.FC<Props> = ({post}) => {
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
           {/* タグ情報を表示 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs mr-2 mb-2"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post;
