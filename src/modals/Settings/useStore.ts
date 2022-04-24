import {UserStore} from '../../store';

const useStore = () => {
  const {user, isUpdating, error} = UserStore;

  return {
    user,
    error,
    isUpdating,
  };
};

export default useStore;
