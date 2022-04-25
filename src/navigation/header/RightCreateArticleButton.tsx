import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Button} from 'native-base';
import {Colors} from 'react-native-ui-lib';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {MemberStackParams} from '../types';

const RightCreateArticleButton = () => {
  const {push} = useNavigation<StackNavigationProp<MemberStackParams>>();

  const onPress = useCallback(() => {
    push('CreateArticleModal');
  }, [push]);

  return (
    <View paddingH-s2>
      <Button onPress={onPress} variant="link">
        <Ionicons name="create-outline" size={24} color={Colors.white} />
      </Button>
    </View>
  );
};

export default RightCreateArticleButton;
