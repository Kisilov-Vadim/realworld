import {User} from '../../store/types';

export const mapToRequestBody = (user: User): [boolean, User] => {
  let isEmpty = true;

  const newUser = Object.entries(user).reduce((acc: User, [key, value]) => {
    if (value) {
      isEmpty = false;
      acc[key as keyof User] = value;
    }

    return acc;
  }, {});

  return [isEmpty, newUser];
};
