import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';

import {Login, SignUp} from './components';

type AuthModalProps = {
  route: {
    params?: {
      isRegister?: boolean;
    };
  };
};

const Auth = ({route}: AuthModalProps) => {
  const {params} = route;
  const [isLoginMode, setIsLoginMode] = useState(!params?.isRegister);

  const goToLogin = () => setIsLoginMode(true);
  const goToSignUp = () => setIsLoginMode(false);

  return (
    <View flex centerV paddingH-s5>
      {isLoginMode ? (
        <Login goToSignUp={goToSignUp} />
      ) : (
        <SignUp goToLogin={goToLogin} />
      )}
    </View>
  );
};

export default Auth;
