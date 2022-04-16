import {Article} from '../store/articles/types';

import {limit} from './helpers';
import requests from './requests';
import {LimitParams} from './types';

type ResArticle = {
  articles: Article[];
  articlesCount: number;
};

export default {
  all: (params: LimitParams): ResArticle =>
    requests.get(`/articles?${limit(params)}`),
  feed: (): ResArticle => requests.get('/articles/feed?limit=10&offset=0'),
};
