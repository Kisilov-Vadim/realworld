import {action, makeAutoObservable} from 'mobx';
import {AsyncStorage} from 'react-native';
import {Cache} from 'react-native-cache';

import {AuthService} from '../services';
import {ResponseUser} from '../services/Auth';
import ErrorMessages from '../errorMessages';

import {User} from './types';
import ArticlesStore from './ArticlesStore';

const cache = new Cache({
  namespace: 'myapp',
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 0, // the standard ttl as number in seconds, default: 0 (unlimited)
  },
  backend: AsyncStorage,
});

class Store {
  isLoading = true;
  error?: string = undefined;
  user?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async loadFromStorage() {
    const value = await cache.get('USER');

    if (value) {
      this.user = JSON.parse(value);
    }

    this.isLoading = false;
  }

  async $updateStorage(user?: User) {
    if (user) {
      await cache.set('USER', JSON.stringify(user));
    } else {
      await cache.clearAll();
    }
  }

  setUser(user?: User) {
    this.user = user;
    this.$updateStorage(user);

    ArticlesStore.clear();
  }

  loadUser() {
    this.isLoading = true;

    AuthService.get()
      .then(
        action(({user}: ResponseUser) => {
          this.setUser(user);
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

  forgetUser() {
    this.setUser(undefined);
  }
}

export default new Store();
