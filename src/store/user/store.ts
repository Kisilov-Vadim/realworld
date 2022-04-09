import {makeAutoObservable} from 'mobx';

import {User} from './types';

class Store {
  isLoading = true;
  error?: Error = undefined;
  user?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setUser(user: User) {
    this.user = user;
  }

  setError(error: Error) {
    this.error = error;
  }
}

export default new Store();
