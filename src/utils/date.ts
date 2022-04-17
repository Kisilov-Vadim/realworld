import {format} from 'date-fns';

import ErrorMessages from '../errorMessages';

export const formatDate = (date?: string | Date): string => {
  if (!date) {
    console.error(ErrorMessages.invalidDate);
    return '';
  }

  const dateToFormat = date instanceof Date ? date : new Date(date);

  return format(dateToFormat, 'dd.MM.yyyy');
};
