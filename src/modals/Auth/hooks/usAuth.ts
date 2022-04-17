import {useCallback, useState, useEffect} from 'react';

import {Keyboard} from 'react-native';
import {loginUser, signUpUser} from '../../../store/auth/actions';
import {AuthStore} from '../../../store';

import {showErrorModals} from '../helpers';

import useStore from './useStore';

const useAuth = () => {
  const {isLoading, user, errors} = useStore();

  const [show, setShow] = useState(false);

  const onNameChange = useCallback((value: string) => {
    AuthStore.setUsername(value);
  }, []);

  const onEmailChange = useCallback((value: string) => {
    AuthStore.setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    AuthStore.setPassword(value);
  }, []);

  const onSignUp = useCallback(async () => {
    Keyboard.dismiss();
    await signUpUser();
  }, []);

  const onLogin = useCallback(async () => {
    Keyboard.dismiss();
    await loginUser();
  }, []);

  useEffect(() => {
    if (errors) {
      showErrorModals(errors);
    }
  }, [errors]);

  useEffect(() => () => AuthStore.clear(), []);

  return {
    show,
    isLoading,
    user,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    setShow,
    onLogin,
    onSignUp,
  };
};

export default useAuth;
