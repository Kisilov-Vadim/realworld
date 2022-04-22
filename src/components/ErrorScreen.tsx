import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {Button} from 'native-base';

import ErrorMessages from '../errorMessages';

type ErrorScreenProps = {
  onPress?: () => void;
  message?: string;
};

const ErrorScreen = ({onPress, message}: ErrorScreenProps) => (
  <View flex center paddingH-s5>
    <Text text60 marginB-s5 grey10>
      {message || ErrorMessages.default}
    </Text>
    <Button variant="outline" onPress={onPress} disabled={!onPress}>
      Reload
    </Button>
  </View>
);

export default ErrorScreen;
