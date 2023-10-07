export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  profile: ProfileType;
}
export type User = Pick<UserType, 'id' | 'username'>;

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

export interface TagType {
  id: number;
  name: string;
  postId: number;
  post: PostType;
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  user: UserType;
}

// modal
export interface ModalType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

//bookmarks
export interface BookmarkType {
  id: number;
  user: UserType;
  postId: number;
  title: string;
  startAt: number;
}

// book一覧
export interface BooksType {
  id: number;
  bookId: string;
  title: string;
  description: string;
  pageCount: number | null;
  image: string;
  author: UserType;
  tags: TagType[];
}
// google books api から取得した情報のインタフェース
export type Book = Omit<BooksType, 'tags'>;
