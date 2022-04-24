import {ResponseErrors} from '../services/types';

import {showErrorToast} from './toast';

export const showErrorModals = (errors: ResponseErrors) => {
  Object.entries(errors).forEach(([key, value]) => {
    showErrorToast({title: `${key} ${value}`});
  });
};
