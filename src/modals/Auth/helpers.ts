import {Toast} from 'native-base';

import {AuthErrors} from '../../store/auth/store';

export const showErrorModals = (errors: AuthErrors) => {
  Object.entries(errors).forEach(([key, value]) => {
    Toast.show({title: `${key} ${value}`, bgColor: 'red.500', duration: 3000});
  });
};
