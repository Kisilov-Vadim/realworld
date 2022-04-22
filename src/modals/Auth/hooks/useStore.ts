import {AuthStore} from '../../../store';

const useStore = () => {
  const {isLoading, errors, authValues: user} = AuthStore;

  return {
    isLoading,
    user,
    errors,
  };
};

export default useStore;
