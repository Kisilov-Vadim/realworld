import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {Button, Icon, Input, Stack} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';

import useAuth from '../hooks/usAuth';

type LoginProps = {
  goToSignUp: () => void;
};

const Login = observer(({goToSignUp}: LoginProps) => {
  const {
    show,
    isLoading,
    user,
    onEmailChange,
    onPasswordChange,
    setShow,
    onLogin,
  } = useAuth();

  return (
    <>
      <Text text30BO blue30>
        Login
      </Text>
      <View marginT-s5>
        <Stack space={4} w="100%" alignItems="center">
          <Input
            placeholder="Email"
            value={user.email}
            onChangeText={onEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
            size="lg"
            w={{
              base: '75%',
              md: '25%',
            }}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
          <Input
            placeholder="Password"
            type={show ? 'text' : 'password'}
            value={user.password}
            onChangeText={onPasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            size="lg"
            w={{
              base: '75%',
              md: '25%',
            }}
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={show ? 'visibility' : 'visibility-off'}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setShow(!show)}
              />
            }
          />
          <Button
            isLoading={isLoading}
            isLoadingText="Logining..."
            onPress={onLogin}
          >
            LOGIN
          </Button>
          <Text text70>or</Text>
          <Button variant="link" onPress={goToSignUp}>
            Sign Up
          </Button>
        </Stack>
      </View>
    </>
  );
});

export default Login;
