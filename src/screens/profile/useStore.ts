import {UserStore} from '../../store';
import ProfileStore from '../../store/Profile';

const useStore = () => {
  const {isLoading, profile, error} = ProfileStore;
  const {user} = UserStore;

  return {
    user,
    profile,
    isProfileError: error,
    isProfileLoading: isLoading,
  };
};

export default useStore;
