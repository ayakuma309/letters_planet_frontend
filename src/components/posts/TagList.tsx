import React from 'react';
import { TagType } from '@/types/types';

type Props = {
  tags: TagType[];
};

const TagList: React.FC<Props> = ({ tags }) => {
  return (
    <div className="flex flex-wrap mt-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs mr-2 mb-2"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default TagList;
