import apiClient from '@/lib/apiClient';
import { ProfileType } from '@/types/types';
import { GetServerSideProps } from 'next';
import React from 'react';

type Props = {
  profile: ProfileType;
};
//SSRにするのがいい
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { userId } = context.query;

  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);

    return {
      props: {
        profile: profileResponse.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

const UserProfile = ({ profile }: Props) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='w-full max-w-xl mx-auto'>
        <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
          <div className='flex items-center'>
            <img
              className='w-20 h-20 rounded-full mr-4'
              alt='User Avatar'
              src={profile.profileImageUrl}
            />
            <div>
              <h2 className='text-2xl font-semibold mb-1'>
                {profile.user.username}
              </h2>
              <p className='text-gray-600'>{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
