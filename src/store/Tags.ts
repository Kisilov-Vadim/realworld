import {action, makeAutoObservable} from 'mobx';

import {TagsService} from '../services';
import ErrorMessages from '../errorMessages';
import {TagsResponse} from '../services/Tags';

class Store {
  isLoading = true;
  tags: string[] = [];
  error?: string = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  loadTags() {
    this.isLoading = true;

    TagsService.get()
      .then(
        action(({tags}: TagsResponse) => {
          this.tags = tags.filter(Boolean);
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
