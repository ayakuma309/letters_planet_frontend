import { QiitaItemsProps } from '@/types/qiitaTypes'
import React from 'react'

type Props = {
  item: QiitaItemsProps
}

const QiitaItem: React.FC<Props> = ({item}) => {
  return (
    <div className="mb-3 py-3 px-8  rounded-lg shadow-lg w-10/12">
      <p className="text-center font-bold  text-blue-800 mb-4">
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </p>
      <div className="flex flex-wrap items-center justify-center">
        {item.tags.length > 0 && item.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {tag.name}
          </span>
        ))}
      </div>
      <div className='flex items-center mt-3'>
        <img
          className="w-10 h-10 rounded-full mr-4"
          alt="User Avatar"
          src={item.user.profile_image_url}
        />
        <p className="text-gray-700">{item.user.name}</p>
      </div>
    </div>
  )
}

export default QiitaItem
