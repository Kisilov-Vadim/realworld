import {Article} from '../store/articles/types';

import {LimitParams} from './types';

export const limit = ({limit, page}: LimitParams) =>
  `limit=${limit}&offset=${page ? page * limit : 0}`;

export const omitSlug = (article: Article) => ({...article, slug: undefined});
