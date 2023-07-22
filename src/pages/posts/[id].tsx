import React from 'react'
import apiClient from '@/lib/apiClient';
import { PostType } from '@/types/types';
import { GetServerSideProps } from 'next';
import Youtube from 'react-youtube'
import TagList from '@/components/posts/TagList';
import CommentForm from '@/components/comments/CommentForm';

type Props = {
  post: PostType
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.query;
  try{
    const postResponse = await apiClient.get(`/posts/${id}`);

    return{
      props: {
        post: postResponse.data,
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
          <Youtube videoId={post.videoId} className="w-100 h-100 rounded-md  mx-auto"/>
          <p className='text-xl font-bold my-2'>{post.title}</p>
          <p className="text-gray-700">{post.description}</p>
          {post.tags && post.tags.length > 0 && <TagList tags={post.tags} />}
        </div>
      </div>
      <CommentForm postId={post.id} />
    </div>
  )
}

export default PostDetail;
