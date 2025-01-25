// context
export interface UserContextType {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>;
}

// common
export interface User {
  id: string;
  name: string;
  bio?: string;
  image: string;
}

export interface Profile extends User {
  user_id: string;
}

export interface CropperDimensions {
  height?: number | null;
  width?: number | null;
  left?: number | null;
  right?: number | null;
}

export interface PostWithProfile {
  id: string;
  user_id: string;
  video_url: string;
  created_at: string;
  text: string;
  profile: {
    user_id: string;
    name: string;
    image: string;
  };
}

export interface CommentWithProfile {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  text: string;
  profile: {
    user_id: string;
    name: string;
    image: string;
  };
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  created_at: string;
}

export interface ShowErrorObject {
  type: string;
  message: string;
}

// layouts/includes
export interface MenuItemProps {
  iconString: string;
  sizeString: string;
  colorString: string;
}

export interface MenuItemFollowProps {
  user: User;
}

// Component props types
export interface PostMainProps {
  post: PostWithProfile;
}

export interface PostMainLikeProps {
  post: PostWithProfile;
}

export interface ProfileProps {
  params: Promise<{ id: string }>;
}

export interface PostUserProps {
  post: Post;
}

export interface TextInputProps {
  string: string;
  placeholder: string;
  onUpdate: (value: string) => void;
  inputType: string;
  error: string;
}

export interface PostPageProps {
  params: Promise<{
    userId: string;
    postId: string;
  }>;
}

// COMPONENT TYPES
export interface CommentsHeaderProps {
  params: { userId: string; postId: string };
  post: PostWithProfile;
}

export interface CommentsProps {
  params: { userId: string; postId: string };
}

export interface SingleCommentProps {
  params: { postId: string; userId: string };
  comment: CommentWithProfile;
}
