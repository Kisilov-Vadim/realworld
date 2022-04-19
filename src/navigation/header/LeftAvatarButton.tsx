import React, {useCallback} from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {StackNavigationProp} from '@react-navigation/stack';

import {UserStore} from '../../store';

import {RootStackParams} from '../types';

const LeftAvatarButton = () => {
  const user = UserStore.getUser();
  const {push} = useNavigation<StackNavigationProp<RootStackParams>>();

  const openAuthModal = useCallback(() => {
    push('AuthModal');
  }, [push]);

  if (user) {
    return (
      <TouchableOpacity paddingH-s5>
        <Avatar
          useAutoColors
          size={36}
          source={{uri: user.image}}
          name={user.username}
          label={user.username}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity paddingH-s5 onPress={openAuthModal}>
      <FontAwesome5 name="user-circle" size={30} color={Colors.black} />
    </TouchableOpacity>
  );
};

export default LeftAvatarButton;
