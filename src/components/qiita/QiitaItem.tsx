import React from 'react'

type Props = {
  item: {
    id: string
    title: string
    url: string
  }
}

const QiitaItem: React.FC<Props> = ({item}) => {
  return (
    <div>
      <li key={item.id}>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </li>
    </div>
  )
}

export default QiitaItem
