export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  profile: ProfileType;
}


export interface ProfileType {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
}
export interface PostType {
  id: number;
  videoId: string;
  url: string;
  title: string;
  description: string;
  createdAt: string;
  authorId: number;
  author: UserType;
  tags: TagType[];
}

interface TagType {
  id: number;
  name: string;
  postId: number;
  post: PostType;
}
