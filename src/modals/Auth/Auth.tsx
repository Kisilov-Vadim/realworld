import React, {useState} from 'react';
import {View} from 'react-native-ui-lib';
import {Login, SignUp} from './components';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const goToLogin = () => setIsLoginMode(true);
  const goToSignUp = () => setIsLoginMode(false);

  return (
    <View flex center paddingH-s5>
      {isLoginMode ? (
        <Login goToSignUp={goToSignUp} />
      ) : (
        <SignUp goToLogin={goToLogin} />
      )}
    </View>
  );
};

export default Auth;
