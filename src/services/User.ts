import {User} from '../store/user/types';

import requests from './requests';
import {ResponseValue} from './types';

export type LoginUser = {
  email: string;
  password: string;
};

export type LoginUserApi = {
  user: LoginUser;
};

export type RegisterUser = {
  user: {
    username: 'string';
    email: 'string';
    password: 'string';
  };
};

export type ResReqUser = {
  user: User;
};

export type ReturnUser = Promise<ResponseValue<ResReqUser>>;

export default {
  get: (): ReturnUser => requests.get('/user'),
  login: (user: LoginUser): ReturnUser => requests.post('/users/login', {user}),
  register: (user: RegisterUser): ReturnUser => requests.post('/users', {user}),
  put: (user: ResReqUser): ReturnUser => requests.put('/user', {user}),
};
