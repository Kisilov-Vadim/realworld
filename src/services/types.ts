export type ResponseValue<V> = {
  value?: V;
  error?: string;
};

export type LimitParams = {
  limit: number;
  page: number;
};

export type ArticlesRequestParams = LimitParams & {
  tag?: string;
  author?: string;
  favorited?: string;
};

export type ResponseErrors = {
  [id: string]: string[];
};
