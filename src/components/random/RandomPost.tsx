import React from 'react'
import Link from 'next/link'
import { PostType } from '@/types/types';

type Props = {
  post: PostType
}

const RandomPost:React.FC<Props> = ({post}) => {
  return (
    <div style={{width: "300px"}}>
      <div className="bg-white shadow-md rounded p-4 m-1 ">
        <div>
          <Link href={`/posts/${post.id}`}>
            <img
              src={post.url}
              className="w-100 h-100 rounded-md  mx-auto"
              alt="youtube image"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RandomPost
