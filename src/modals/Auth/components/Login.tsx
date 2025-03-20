import React from 'react';
import {Button} from 'native-base';
import {observer} from 'mobx-react-lite';
import {View, Text, TextField} from 'react-native-ui-lib';

import useAuth from '../hooks/usAuth';

type LoginProps = {
  goToSignUp: () => void;
};

const Login = observer(({goToSignUp}: LoginProps) => {
  const {
    isLoading,
    user,
    onEmailChange,
    onPasswordChange,
    onLogin,
  } = useAuth();

  return (
    <>
      <View center>
        <Text text30BO blue30>
          Login
        </Text>
      </View>
      <View marginT-s5>
        <TextField
          placeholder="Email"
          value={user.email}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onEmailChange}
          preset={TextField.presets.OUTLINE}
        />
        <TextField
          placeholder="Password"
          value={user.password}
          onChangeText={onPasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          preset={TextField.presets.OUTLINE}
        />

        <Button
          isLoading={isLoading}
          isLoadingText="Logining..."
          onPress={onLogin}
        >
          LOGIN
        </Button>

        <View centerH>
          <Text text70>or</Text>
          <Button variant="link" onPress={goToSignUp}>
            Sign Up
          </Button>
        </View>
      </View>
    </>
  );
});

export default Login;
