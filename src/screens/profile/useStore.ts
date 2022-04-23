import ProfileStore from '../../store/Profile';

const useStore = () => {
  const {isLoading, profile, error} = ProfileStore;

  return {
    profile,
    isProfileError: error,
    isProfileLoading: isLoading,
  };
};

export default useStore;
