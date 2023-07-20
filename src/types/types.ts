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
