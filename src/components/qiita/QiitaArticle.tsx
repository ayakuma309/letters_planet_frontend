import React from 'react'
import { QiitaArticleProps } from '@/types/qiitaTypes';

const QiitaArticle: React.FC<QiitaArticleProps> = ({url, title, tags, profileImageUrl,username}) => {
  return (
    <div className="mb-3 py-3 px-8  rounded-lg shadow-lg w-10/12">
      <p className="text-center font-bold  text-blue-800 mb-4">
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </p>
      <div className="flex flex-wrap items-center justify-center">
        {tags.length > 0 && tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {tag.name}
          </span>
        ))}
      </div>
      <div className='flex items-center mt-3 justify-between'>
        <div>
          <img
            className="w-10 h-10 rounded-full mr-4"
            alt="User Avatar"
            src={profileImageUrl}
          />
          <p className="text-gray-700">{username}</p>
        </div>
      </div>
    </div>
  )
}

export default QiitaArticle;
