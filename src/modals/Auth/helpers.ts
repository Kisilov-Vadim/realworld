import {showErrorToast} from '../../utils/toast';
import {ResponseErrors} from '../../services/types';

export const showErrorModals = (errors: ResponseErrors) => {
  Object.entries(errors).forEach(([key, value]) => {
    showErrorToast({title: `${key} ${value}`});
  });
};
