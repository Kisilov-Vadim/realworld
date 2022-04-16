import {makeAutoObservable} from 'mobx';

import {Article} from './types';

type StoreArticle = {
  isLoading: boolean;
  isRefreshing: boolean;
  data: Article[];
  page: number;
  error?: string;
  totalPagesCount?: number;
};

const initArticleStore = () => ({
  isLoading: true,
  isRefreshing: false,
  page: 0,
  data: [],
});

class Store {
  articles: StoreArticle = initArticleStore();
  userArticles: StoreArticle = initArticleStore();

  constructor() {
    makeAutoObservable(this);
  }

  getArticles() {
    return this.articles;
  }

  getUserArticles() {
    return this.userArticles;
  }

  setArticles(articles: Partial<StoreArticle>) {
    this.articles = {...this.articles, ...articles};
  }

  setUserArticles(articles: Partial<StoreArticle>) {
    this.userArticles = {...this.userArticles, ...articles};
  }
}

export default new Store();
