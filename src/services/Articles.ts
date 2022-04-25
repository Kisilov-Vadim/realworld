import {Article, NewArticle, UpdateArticle} from '../store/types';

import {limit, omitSlug} from './helpers';
import requests from './requests';
import {ArticlesRequestParams, LimitParams} from './types';

export type ResArticle = {
  articles: Article[];
  articlesCount: number;
};

export type ArticleCrud = {
  article: Article;
};

export default {
  all: (params: LimitParams): Promise<ResArticle> =>
    requests.get(`/articles?${limit(params)}`),
  feed: (params: LimitParams): Promise<ResArticle> =>
    requests.get(`/articles/feed?${limit(params)}`),
  favorite: (slug: string) => requests.post(`/articles/${slug}/favorite`, {}),
  unfavorite: (slug: string) => requests.del(`/articles/${slug}/favorite`),
  favoritedBy: ({
    author,
    ...rest
  }: ArticlesRequestParams): Promise<ResArticle> =>
    requests.get(`/articles?favorited=${author}&${limit(rest)}`),
  byTag: ({tag, ...rest}: ArticlesRequestParams): Promise<ResArticle> =>
    requests.get(`/articles?tag=${tag}&${limit(rest)}`),
  byAuthor: ({author, ...rest}: ArticlesRequestParams): Promise<ResArticle> =>
    requests.get(`/articles?author=${author}&${limit(rest)}`),
  create: (article: NewArticle): Promise<ArticleCrud> =>
    requests.post('/articles', {article}),
  update: (article: UpdateArticle): Promise<ArticleCrud> =>
    requests.put(`/articles/${article.slug}`, {article: omitSlug(article)}),
  delete: (slug: string): Promise<ArticleCrud> =>
    requests.del(`/articles/${slug}`),
};
