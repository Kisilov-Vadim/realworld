import {action, makeAutoObservable} from 'mobx';

import {ArticlesStore, UserStore} from '.';
import {AuthService} from '../services';

import {ResponseErrors} from '../services/types';

enum RequestType {
  login,
  register,
}

class Store {
  isLoading = false;
  errors?: ResponseErrors = undefined;

  username = '';
  email = '';
  password = '';

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.errors = undefined;
  }

  get authValues() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }

  setUsername(username: string) {
    this.username = username;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  $request(type: RequestType) {
    this.isLoading = true;
    this.errors = undefined;

    const api =
      type === RequestType.login ? AuthService.login : AuthService.register;

    api(this.authValues)
      .then(
        action(({user}) => {
          UserStore.setUser(user);
          this.clear();
        })
      )
      .catch(
        action((err) => {
          if (err?.response?.body?.errors) {
            this.errors = err?.response?.body?.errors;
          }
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  login() {
    this.$request(RequestType.login);
  }

  register() {
    this.$request(RequestType.register);
  }

  logout() {
    UserStore.forgetUser();
    ArticlesStore.clear();
  }
}

export default new Store();
