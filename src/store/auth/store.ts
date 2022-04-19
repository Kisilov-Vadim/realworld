import {makeAutoObservable} from 'mobx';

import {ResponseErrors} from '../../services/types';

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

  getIsLoading() {
    return this.isLoading;
  }

  getErrors() {
    return this.errors;
  }

  getAuthValues() {
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

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(errors?: ResponseErrors) {
    this.errors = errors;
  }
}

export default new Store();
