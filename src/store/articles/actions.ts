import {ErrorMessages} from '../../core';
import {ArticlesService} from '../../services';

import {LIMIT} from '../constants';

import store from './store';

export const loadArticles = async () => {
  const {data, totalPagesCount, page} = store.getArticles();

  if (page === totalPagesCount) return;
  store.setArticles({error: undefined, isLoading: true});

  try {
    const value = await ArticlesService.all({limit: LIMIT, page});

    store.setArticles({
      page: page + 1,
      data: [...data, ...(value.articles || [])],
      totalPagesCount: Math.ceil(value.articlesCount / LIMIT),
    });
  } catch (err) {
    console.error(err);
    store.setArticles({error: ErrorMessages.default});
  } finally {
    store.setArticles({isLoading: false});
  }
};

export const refreshArticles = async () => {
  store.setArticles({error: undefined, isRefreshing: true});

  try {
    const value = await ArticlesService.all({limit: LIMIT, page: 0});

    store.setArticles({
      page: 1,
      data: value.articles || [],
      totalPagesCount: Math.ceil(value.articlesCount / LIMIT),
    });
  } catch (err) {
    console.error(err);
    store.setArticles({error: ErrorMessages.default});
  } finally {
    store.setArticles({isRefreshing: false});
  }
};
