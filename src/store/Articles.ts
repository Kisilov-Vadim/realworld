import {ResponseError} from 'superagent';
import {action, computed, makeAutoObservable, observable} from 'mobx';

import {ArticlesService} from '../services';
import ErrorMessages from '../errorMessages';

import {Article, NewArticle, UpdateArticle} from './types';
import {LIMIT} from './constants';

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
  articlesMap: Map<string, Article> = observable.map();
  page = 0;
  totalPagesCount = 0;
  predicate: Predicate = {};
  error?: string = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  getArticle(slug: string) {
    return this.articlesMap.get(slug);
  }

  @computed get articles() {
    return [...this.articlesMap.values()];
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

  loadArticles(predicate: Predicate) {
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

  favorite(slug: string) {
    const article = this.getArticle(slug);
    if (article && !article.favorited) {
      article.favorited = true;
      article.favoritesCount += 1;
      return ArticlesService.favorite(slug).catch(
        action((err: ResponseError) => {
          console.error(err);
          article.favorited = false;
          article.favoritesCount -= 1;
          throw new Error();
        })
      );
    }

    return Promise.resolve();
  }

  unFavorite(slug: string) {
    const article = this.getArticle(slug);
    if (article && article.favorited) {
      article.favorited = false;
      article.favoritesCount -= 1;
      return ArticlesService.unfavorite(slug).catch(
        action((err: ResponseError) => {
          console.error(err);
          article.favorited = true;
          article.favoritesCount += 1;
          throw new Error();
        })
      );
    }

    return Promise.resolve();
  }

  createArticle(article: NewArticle) {
    return ArticlesService.create(article)
      .then(({article}) => {
        this.articlesMap.set(article.slug, article);
        return article;
      })
      .catch(
        action((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  updateArticle(article: UpdateArticle) {
    return ArticlesService.update(article)
      .then(({article}) => {
        this.articlesMap.set(article.slug, article);
        return article;
      })
      .catch(
        action((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  deleteArticle(slug: string) {
    return ArticlesService.delete(slug)
      .then(
        action(() => {
          this.articlesMap.delete(slug);
        })
      )
      .catch(
        action((err) => {
          console.error(err);
        })
      );
  }
}

export default new Store();
