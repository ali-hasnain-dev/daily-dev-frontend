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
  data: Array<T>;
  path: string;
  per_page: number;
  next_cursor: string;
  next_page_url?: string;
  prev_cursor?: string;
  prev_page_url?: string;
};
