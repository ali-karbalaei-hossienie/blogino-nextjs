export interface Category {
  _id: string;
  title: string;
  englishTitle: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  avatar: string;
  avatarUrl: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
}

export interface CommentAnswer {
  _id: string;
  user: User;
  content: {
    text: string;
  };
  status: number;
  openToComment: boolean;
  createdAt: string;
}

export interface Comment {
  _id: string;
  user: User;
  content: {
    text: string;
  };
  status: number;
  openToComment: boolean;
  createdAt: string;
  answers: CommentAnswer[];
}

export interface BlogPost {
  _id: string;
  id: string;

  title: string;
  slug: string;

  category: Category;

  type: string;
  briefText: string;
  text: string;

  coverImage: string;
  coverImageUrl: string;

  readingTime: number;

  tags: string[];

  author: User;

  related: BlogPost[];

  createdAt: string;
  updatedAt: string;

  __v: number;

  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;

  comments: Comment[];
  commentsCount: number;
}
