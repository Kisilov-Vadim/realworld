import {Toast} from 'native-base';

import {ResponseErrors} from '../../services/types';

export const showErrorModals = (errors: ResponseErrors) => {
  Object.entries(errors).forEach(([key, value]) => {
    Toast.show({title: `${key} ${value}`, bgColor: 'red.500', duration: 3000});
  });
};
