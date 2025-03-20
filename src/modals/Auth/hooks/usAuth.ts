import {useCallback, useState, useEffect} from 'react';

import {Keyboard} from 'react-native';
import {AuthStore} from '../../../store';
import {showErrorModals} from '../../../utils/errors';

import useStore from './useStore';

const useAuth = () => {
  const {isLoading, user, errors} = useStore();

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
    AuthStore.register();
  }, []);

  const onLogin = useCallback(async () => {
    Keyboard.dismiss();
    AuthStore.login();
  }, []);

  useEffect(() => {
    if (errors) {
      showErrorModals(errors);
    }
  }, [errors]);

  useEffect(() => () => AuthStore.clear(), []);

  return {
    user,
    isLoading,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onLogin,
    onSignUp,
  };
};

export default useAuth;
