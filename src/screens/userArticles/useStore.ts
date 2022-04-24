import {UserStore} from '../../store';

const useStore = () => {
  const {user} = UserStore;

  return {
    user,
  };
};

export default useStore;
