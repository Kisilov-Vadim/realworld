import {useState, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthStore, UserStore} from '../../store';

import useStore from './useStore';
import {mapToRequestBody} from './utils';
import {showErrorToast} from '../../utils/toast';

const useSettings = () => {
  const navigation = useNavigation();
  const {user, isUpdating, error} = useStore();

  const [userFields, setUserFields] = useState({
    image: user?.image || '',
    username: user?.username || '',
    bio: user?.bio || '',
    email: user?.email || '',
    password: '',
  });

  const onImageChange = useCallback((image: string) => {
    setUserFields((prev) => ({...prev, image}));
  }, []);

  const onUserNameChange = useCallback((username: string) => {
    setUserFields((prev) => ({...prev, username}));
  }, []);

  const onBioChange = useCallback((bio: string) => {
    setUserFields((prev) => ({...prev, bio}));
  }, []);

  const onEmailChange = useCallback((email: string) => {
    setUserFields((prev) => ({...prev, email}));
  }, []);

  const onPasswordChange = useCallback((password: string) => {
    setUserFields((prev) => ({...prev, password}));
  }, []);

  const onUserUpdate = useCallback(async () => {
    const [isEmpty, newUser] = mapToRequestBody(userFields);
    if (isEmpty) return;

    try {
      await UserStore.updateUser(newUser);
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  }, [navigation, userFields]);

  const onLogoutPress = useCallback(async () => {
    AuthStore.logout();
  }, []);

  useEffect(() => {
    if (error) {
      showErrorToast({title: error});
    }
  }, [error]);

  return {
    isUpdating,
    user: userFields,
    onImageChange,
    onUserNameChange,
    onBioChange,
    onEmailChange,
    onPasswordChange,
    onUserUpdate,
    onLogoutPress,
  };
};

export default useSettings;
