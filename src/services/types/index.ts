export interface authTpe {
  email: string;
  password: string;
  name: string;
}

export interface AuthUserType {
  _id: string;
  name: string;
  email: string;
  bookmarkedPosts: string[];
  likedPosts: string[];
  avatar: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthResponseData {
  message: string;
  user: AuthUserType;
}

export interface AuthResponse {
  data: AuthResponseData;
}
