import {action, makeAutoObservable} from 'mobx';
import ErrorMessages from '../errorMessages';

import {ArticlesService} from '../services';

import {LIMIT} from './constants';

import {Article} from './types';

export type Predicate = {
  myFeed?: string;
  favoritedBy?: string;
  tag?: string;
  author?: string;
};
class Store {
  isLoading = true;
  isRefreshing = false;
  isLastPage = false;
  articlesMap: Map<string, Article> = new Map();
  page = 0;
  totalPagesCount = 0;
  predicate: Predicate = {};
  error?: string = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  $request() {
    if (this.predicate.myFeed)
      return ArticlesService.feed({page: this.page, limit: LIMIT});
    if (this.predicate.favoritedBy)
      return ArticlesService.favoritedBy({
        author: this.predicate.favoritedBy,
        page: this.page,
        limit: LIMIT,
      });
    if (this.predicate.tag)
      return ArticlesService.byTag({
        tag: this.predicate.tag,
        page: this.page,
        limit: LIMIT,
      });
    if (this.predicate.author)
      return ArticlesService.byAuthor({
        author: this.predicate.author,
        page: this.page,
        limit: LIMIT,
      });

    return ArticlesService.all({page: this.page, limit: LIMIT});
  }

  get articles() {
    return [...this.articlesMap.values()];
  }

  clear() {
    this.articlesMap.clear();
    this.page = 0;
    this.totalPagesCount = 0;
    this.error = undefined;
  }

  setPredicate(predicate: Predicate) {
    if (JSON.stringify(predicate) === JSON.stringify(this.predicate)) return;
    this.clear();
    this.predicate = predicate;
  }

  fetchArticles(predicate: Predicate) {
    this.setPredicate(predicate);
    this.isLoading = true;
    this.error = undefined;

    this.$request()
      .then(
        action(({articles, articlesCount}) => {
          articles.forEach((article) =>
            this.articlesMap.set(article.slug, article)
          );

          const newPage = this.page + 1;

          this.totalPagesCount = Math.ceil(articlesCount / LIMIT);
          this.isLastPage = newPage >= this.totalPagesCount;
          this.page += newPage;
        })
      )
      .catch(
        action(() => {
          this.error = ErrorMessages.default;
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  refreshArticles() {
    this.isRefreshing = true;
    this.error = undefined;
    this.page = 0;

    this.$request()
      .then(
        action(({articles, articlesCount}) => {
          this.clear();

          articles.forEach((article) =>
            this.articlesMap.set(article.slug, article)
          );

          this.totalPagesCount = Math.ceil(articlesCount / LIMIT);
          this.page += 1;
        })
      )
      .catch(
        action(() => {
          this.error = ErrorMessages.default;
        })
      )
      .finally(
        action(() => {
          this.isRefreshing = false;
        })
      );
  }
}

export default new Store();
