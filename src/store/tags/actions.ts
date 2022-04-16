import {ErrorMessages} from '../../core';
import {TagsService} from '../../services';

import store from './store';

export const loadTags = async () => {
  store.setIsLoading(true);

  try {
    const value = await TagsService.get();

    store.setTags(value?.tags || []);
  } catch (err) {
    console.error(err);
    store.setError(ErrorMessages.default);
  } finally {
    store.setIsLoading(false);
  }
};
