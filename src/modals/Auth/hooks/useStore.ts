import {AuthStore} from '../../../store';

const useStore = () => {
  const isLoading = AuthStore.getIsLoading();
  const user = AuthStore.getAuthValues();
  const errors = AuthStore.getErrors();

  return {
    isLoading,
    user,
    errors,
  };
};

export default useStore;
