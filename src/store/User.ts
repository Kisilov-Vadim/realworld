import {action, makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthService} from '../services';
import {ResponseUser} from '../services/Auth';

import {User} from './types';
import ArticlesStore from './Articles';

const USER_KEY = 'USER';

class Store {
  isLoading = true;
  isUpdating = false;
  error?: string = undefined;
  user?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async loadFromStorage() {
    try {
      const cachedValue = await AsyncStorage.getItem(USER_KEY);

      if (cachedValue) {
        this.user = JSON.parse(cachedValue);
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
    }

    this.isLoading = false;
  }

  async $updateStorage(user?: User) {
    try {
      if (user) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(USER_KEY);
      }
    } catch (error) {
      console.error('Failed to update storage:', error);
    }
  }

  setUser(user?: User) {
    this.user = user;
    this.error = undefined;
    this.$updateStorage(user);

    ArticlesStore.clear();
  }

  loadUser() {
    this.isLoading = true;
    this.error = undefined;

    AuthService.get()
      .then(
        action(({user}: ResponseUser) => {
          this.setUser(user);
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  updateUser(newUser: User) {
    this.isUpdating = true;
    this.error = undefined;

    return AuthService.put(newUser)
      .then(
        action(({user}) => {
          this.user = user;
        })
      )
      .catch(
        action((err) => {
          console.error(err);

          if (err?.response?.body) {
            this.error = err?.response?.body;
          }

          throw err;
        })
      )
      .finally(
        action(() => {
          this.isUpdating = false;
        })
      );
  }

  forgetUser() {
    this.setUser(undefined);
  }
}

export default new Store();
