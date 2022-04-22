import {action, makeAutoObservable} from 'mobx';

import {AuthService} from '../services';
import {ResponseUser} from '../services/Auth';

import {User} from './types';
import ErrorMessages from '../errorMessages';

class Store {
  isLoading = true;
  error?: string = undefined;
  user?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user?: User) {
    this.user = user;
  }

  loadUser() {
    this.isLoading = true;

    AuthService.get()
      .then(
        action(({user}: ResponseUser) => {
          this.user = user;
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
    this.user = undefined;
  }
}

export default new Store();
