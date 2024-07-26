type ImagePreviewType = {
  url: string;
  title: string;
  siteName: string | undefined;
  description: string | undefined;
  mediaType: string;
  contentType: string | undefined;
  images: string[];
  videos: {};
  favicons: string[];
};

type PostStateType = {
  title?: string;
  url?: string;
  image_url?: string;
  description?: string;
};

type APIResponseType<T> = {
  data: Array<T> | [];
  path: string;
  per_page: number;
  next_cursor: string;
  next_page_url?: string;
  prev_cursor?: string;
  prev_page_url?: string;
};

type PostType = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  url: string;
  image_url: string;
  vote: number;
  comment_count: number;
  user: UserType;
  created_at: string;
  updated_at: string;
};

type UserType = {
  id: number;
  name: string;
  email: string;
  user_name: string;
  profile_image: string;
};
