import {Button} from 'native-base';
import React from 'react';
import {View, Text} from 'react-native-ui-lib';

type GuestCommentsHeaderProps = {
  openAuthLoginModal: () => void;
  openAuthRegisterModal: () => void;
};

const GuestCommentsHeader = ({
  openAuthLoginModal,
  openAuthRegisterModal,
}: GuestCommentsHeaderProps) => (
  <View row center paddingH-s5 paddingT-s2>
    <Button onPress={openAuthLoginModal} variant="link">
      <Text blue30>Sign In</Text>
    </Button>
    <Text>or</Text>
    <Button onPress={openAuthRegisterModal} variant="link">
      <Text blue30>Sign Up</Text>
    </Button>
    <Text>to add comments on this article.</Text>
  </View>
);

export default GuestCommentsHeader;
