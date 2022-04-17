import React, {useCallback} from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Colors, TouchableOpacity} from 'react-native-ui-lib';

import {UserStore} from '../../store';

import {ScreenIds} from '..';

const LeftAvatarButton = () => {
  // todo add types to navigation
  const {push} = useNavigation();
  const user = UserStore.getUser();

  const openAuthModal = useCallback(() => {
    push(ScreenIds.authModal);
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
