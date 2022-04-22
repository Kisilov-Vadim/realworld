import {action, makeAutoObservable} from 'mobx';

import ErrorMessages from '../errorMessages';
import {CommentsService} from '../services';
import {CommentGetResponse} from '../services/Comments';

import {Comment} from './types';

class Store {
  isLoading = true;
  comments: Comment[] = [];
  slug?: string = undefined;
  error?: string = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  clear(slug: string) {
    if (slug === this.slug) return;
    this.slug = slug;

    this.isLoading = true;
    this.comments = [];
    this.error = undefined;
  }

  loadComments(slug: string) {
    this.clear(slug);

    CommentsService.get(slug)
      .then(
        action(({comments}: CommentGetResponse) => {
          this.comments = comments;
        })
      )
      .catch(
        action((err) => {
          console.error(err);
          this.error = ErrorMessages.default;
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }
}

export default new Store();
