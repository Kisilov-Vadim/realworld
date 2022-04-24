import {action, makeAutoObservable} from 'mobx';
import ErrorMessages from '../errorMessages';

import {TagsService} from '../services';
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
          this.tags = tags;
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
