export type User = {
  email?: string;
  token?: string;
  username?: string;
  bio?: string;
  image?: string;
};

export type Author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
};

export type ArticleWrapper = {
  article: Article
};

export type ResArticle = {
  articles: Article[];
  articlesCount: number;
};

export type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
};

export type NewArticle = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export type UpdateArticle = NewArticle & {slug: string};
