export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
}
export type User = Pick<UserType, 'id' | 'username'>;

export interface PostType {
  id: number;
  videoId: string;
  url: string;
  title: string;
  createdAt: string;
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
  tags: TagType[];
}
// google books api から取得した情報のインタフェース
export type Book = Omit<BooksType, 'tags'>;
