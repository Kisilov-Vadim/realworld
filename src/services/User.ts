import {User} from '../store/user/types';

import {API_URI} from './constants';
import {ResponseValue} from './types';
import {request} from './utils';

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

class UserService {
  private uris = {
    login: `${API_URI}/users/login`,
    register: `${API_URI}/users`,
    user: `${API_URI}/user`,
  };

  async loginUser(user: LoginUserApi): ReturnUser {
    const result = await request<ResReqUser, LoginUserApi>({
      url: this.uris.login,
      body: user,
    });

    return result;
  }

  async registerUser(user: RegisterUser): ReturnUser {
    const result = await request<ResReqUser, RegisterUser>({
      url: this.uris.register,
      body: user,
    });

    return result;
  }

  async getUser(): ReturnUser {
    const result = await request<ResReqUser>({
      url: this.uris.user,
    });

    return result;
  }

  async putUser(user: ResReqUser): ReturnUser {
    const result = await request<ResReqUser>({
      url: this.uris.user,
      method: 'PUT',
      body: user,
    });

    return result;
  }
}

export default new UserService();
