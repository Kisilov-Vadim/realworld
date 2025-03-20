import {User} from '../store/types';

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
  get: (): Promise<ResponseUser> => requests.get('/user'),
  login: (user: LoginUser): Promise<ResponseUser> =>
    requests.post('/users/login', {user}),
  register: (user: RegisterUser): Promise<ResponseUser> =>
    requests.post('/users', {user}),
  put: (user: User): Promise<ResponseUser> => {
    console.log('newUser', user);
    return requests.put('/user', {user})
  },
};
