import React from 'react'
import apiClient from '@/lib/apiClient';
import { PostType } from '@/types/types';
import { GetServerSideProps } from 'next';

type Props = {
  post: PostType
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.query;
  try{
    const postResponse = await apiClient.get(`/posts/${id}`);

    return{
      props: {
        post: postResponse.data[0],
      },
    };
  }catch(err){
    console.log(err);
    return{
      notFound: true,
    }
  }
}

const PostDetail = ({post}: Props ) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <div className="mb-4">
          <img
            src={post.url}
            className="w-100 h-100 rounded-md  mx-auto"
            alt="youtube image"
          />
          <p>{post.title}</p>
          <p className="text-gray-700">{post.description}</p>
        </div>
      </div>
    </div>
  )
}

export default PostDetail;
