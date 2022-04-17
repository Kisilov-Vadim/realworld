import {User} from '../store/user/types';

import requests from './requests';

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  username: string;
  email: string;
  password: string;
};

export type ResponseUser = {
  user: User;
};

export default {
  get: (): ResponseUser => requests.get('/user'),
  login: (user: LoginUser): ResponseUser =>
    requests.post('/users/login', {user}),
  register: (user: RegisterUser): ResponseUser =>
    requests.post('/users', {user}),
  put: (user: User): ResponseUser => requests.put('/user', {user}),
};
