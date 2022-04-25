import {UpdateArticle} from '../store/types';

import {LimitParams} from './types';

export const limit = ({limit, page}: LimitParams) =>
  `limit=${limit}&offset=${page ? page * limit : 0}`;

export const omitSlug = (article: UpdateArticle) => ({
  ...article,
  slug: undefined,
});
