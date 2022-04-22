import {Article} from '../store/types';

import {limit} from './helpers';
import requests from './requests';
import {ArticlesRequestParams, LimitParams} from './types';

export type ResArticle = {
  articles: Article[];
  articlesCount: number;
};

export default {
  all: (params: LimitParams): Promise<ResArticle> =>
    requests.get(`/articles?${limit(params)}`),
  feed: (params: LimitParams): Promise<ResArticle> =>
    requests.get(`/articles/feed?${limit(params)}`),
  favoritedBy: ({
    author,
    ...rest
  }: ArticlesRequestParams): Promise<ResArticle> =>
    requests.get(`/articles?favorited=${author}&${limit(rest)}`),
  byTag: ({tag, ...rest}: ArticlesRequestParams): Promise<ResArticle> =>
    requests.get(`/articles?tag=${tag}&${limit(rest)}`),
  byAuthor: ({author, ...rest}: ArticlesRequestParams): Promise<ResArticle> =>
    requests.get(`/articles?author=${author}&${limit(rest)}`),
};
