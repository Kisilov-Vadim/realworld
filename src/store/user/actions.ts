import ErrorMessages from '../../errorMessages';
import {AuthService} from '../../services';

import store from './store';

export const getUser = async () => {
  store.setError(undefined);
  store.setLoading(true);

  try {
    const response = await AuthService.get();
    store.setUser(response.user);
  } catch (err) {
    console.error(err);
    store.setError(ErrorMessages.default);
  } finally {
    store.setLoading(false);
  }
};
