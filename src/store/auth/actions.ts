import {AuthService} from '../../services';

import {AuthStore, UserStore} from '..';

export const logout = () => UserStore.forgetUser();

export const loginUser = async () => {
  AuthStore.setLoading(true);
  AuthStore.setError(undefined);
  const user = AuthStore.getAuthValues();

  try {
    const response = await AuthService.login(user);
    UserStore.setUser(response.user);
    // AuthStore.clear();
  } catch (err: any) {
    console.error(err);

    if (err?.response?.body?.errors) {
      AuthStore.setError(err?.response?.body?.errors);
    }
  } finally {
    AuthStore.setLoading(false);
  }
};

export const signUpUser = async () => {
  AuthStore.setLoading(true);
  AuthStore.setError(undefined);
  const user = AuthStore.getAuthValues();

  try {
    const response = await AuthService.register(user);
    UserStore.setUser(response.user);
    AuthStore.clear();
  } catch (err: any) {
    console.error(err);

    if (err?.response?.body?.errors) {
      AuthStore.setError(err?.response?.body?.errors);
    }
  } finally {
    AuthStore.setLoading(false);
  }
};
