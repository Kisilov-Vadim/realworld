import {UserService} from '../../services';
import {LoginUser} from '../../services/User';

import {updateStore} from './helpers';

import store from './store';

export const getUser = async () => {
  store.setError(undefined);
  store.setLoading(true);

  const response = await UserService.getUser();

  updateStore(response);
};

export const loginUser = async (userData: LoginUser) => {
  store.setError(undefined);
  store.setLoading(true);

  const user = {
    user: userData,
  };

  const response = await UserService.loginUser(user);

  updateStore(response);
};
