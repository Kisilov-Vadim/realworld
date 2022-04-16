import {makeAutoObservable} from 'mobx';

class Store {
  isLoading = true;
  tags: string[] = [];
  error?: string = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  getTags() {
    return this.tags;
  }

  getError() {
    return this.error;
  }

  getIsLoading() {
    return this.isLoading;
  }

  setTags(tags: string[]) {
    this.tags = tags;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error?: string) {
    this.error = error;
  }
}

export default new Store();
