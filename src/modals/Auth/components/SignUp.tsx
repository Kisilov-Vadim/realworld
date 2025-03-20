import React from 'react';
import {Button} from 'native-base';
import {observer} from 'mobx-react-lite';
import {View, Text, TextField} from 'react-native-ui-lib';

import useAuth from '../hooks/usAuth';

type SignUpProps = {
  goToLogin: () => void;
};

const SignUp = observer(({goToLogin}: SignUpProps) => {
  const {
    user,
    isLoading,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onSignUp,
  } = useAuth();

  return (
    <>
      <View center>
        <Text text30BO blue30>
          Sign up
        </Text>
      </View>
      <View marginT-s5>
        <TextField
          placeholder="Username"
          value={user.username}
          onChangeText={onNameChange}
          autoCapitalize="none"
          autoCorrect={false}
          preset={TextField.presets.OUTLINE}
        />
        <TextField
          placeholder="Email"
          value={user.email}
          onChangeText={onEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
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
          onPress={onSignUp}
        >
          SIGN UP
        </Button>

        <View centerH>
          <Text text70>or</Text>
          <Button variant="link" onPress={goToLogin}>
            Login
          </Button>
        </View>
      </View>
    </>
  );
});

export default SignUp;
