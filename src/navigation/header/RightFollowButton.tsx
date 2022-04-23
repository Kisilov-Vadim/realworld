import React, {useCallback} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParams} from '../types';

const RightFollowButton = () => {
  const {push} = useNavigation<StackNavigationProp<RootStackParams>>();

  const onFollowPress = useCallback(() => {
    push('AuthModal');
  }, [push]);

  return (
    <View paddingH-s2>
      <Button onPress={onFollowPress} variant="link">
        <Text white text70BO>
          Follow
        </Text>
      </Button>
    </View>
  );
};
export default RightFollowButton;
