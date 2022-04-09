import {ResponseValue} from '../../services/types';
import {ResReqUser} from '../../services/User';

import store from './store';

export const updateStore = (data: ResponseValue<ResReqUser>) => {
  const {value, error} = data;

  if (value) {
    store.setUser(value.user);
  } else if (error) {
    store.setError(error);
  }

  store.setLoading(false);
};
